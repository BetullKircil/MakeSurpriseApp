import { StyleSheet, Text, View, FlatList, Image, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ipConfig } from '../../../scripts/enums';
import useAsyncStorage from '../../helper/useAsyncStorage';

const AnnouncementPreferencesScreen = ({ navigation }) => {
  const [specialDayAnnounceData, setSpecialDayAnnounceData] = useState([]);
  const { getData } = useAsyncStorage();

  useEffect(() => {
    async function getSpecialDaysAnnounce() {
      const UserId = Number(await getData('userID'));
      const response = await fetch(
        `${ipConfig}SpecialDayCalendar/GetAllSpecialDays?userId=${UserId}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("ozel gunler", data);
        const sortedSpecialDayAnnounceData = data['$values'].sort((dateFirst, dateLast) => {
          return new Date(dateFirst.specialDayDate) - new Date(dateLast.specialDayDate);
        });
        setSpecialDayAnnounceData(sortedSpecialDayAnnounceData);
      }
    }
    getSpecialDaysAnnounce();
  }, []);

  useEffect(() => {
          const handleBackPress = () => {
            navigation.navigate('UserProfileScreen');
            return true; 
          };
      
          const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress
          );
      
          return () => backHandler.remove();
        }, [navigation]);

  const calculateDaysLeft = (specialDayDate) => {
    const today = new Date();
    const targetDate = new Date(specialDayDate);
    const differenceInTime = targetDate - today;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    return differenceInDays > 0 ? differenceInDays : 0;
  };

  const renderSpecialDayItem = ({ item }) => {
    const daysLeft = calculateDaysLeft(item.specialDayDate);

    const isUrgent = daysLeft <= 1;

    return (
      <View style={[styles.card, isUrgent && styles.urgentCard]}>
        <View style={styles.textContainer}>
          <Text style={[styles.dayTitle, isUrgent && styles.urgentDayTitle]}>
            {item.specialDayName}
          </Text>
          <View style={styles.date}>
            <Text style={styles.dateLabel}>Tarih: </Text>
            <Text style={[styles.dayDate, isUrgent && styles.urgentDayDate]}>
              {new Date(item.specialDayDate).toLocaleDateString()}
            </Text>
          </View>

          <Text style={styles.dayTitle}>{item.title}</Text>
          <Text style={[styles.daysLeft, isUrgent && styles.urgentDaysLeft]}>
            {daysLeft > 0 ? `${daysLeft} gün kaldı` : 'Bugün!'}
          </Text>
        </View>
        <Image
          source={
            isUrgent
              ? require('@/assets/images/time-over.png')
              : require('@/assets/images/special-day-timing.png') 
          }
          style={styles.logo}
        />
      </View>
    );
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Özel Günlerim</Text>
      {specialDayAnnounceData.length > 0 ? (
        <FlatList
          data={specialDayAnnounceData}
          renderItem={renderSpecialDayItem}
          keyExtractor={(item, index) => `${item.specialDayId}-${index}`}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noDataText}>Gösterilecek özel gün yok.</Text>
      )}
    </View>
  );
};

export default AnnouncementPreferencesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 16,
  },
  logo: {
    width: 50, 
    height: 50,
    resizeMode: 'contain', 
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  dateLabel: {
    fontSize: 14,
    color: '#555',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 16,
  },
  textContainer: {
    flex: 1, 
    marginRight: 16, 
  },
  date:{
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  urgentCard: {
    backgroundColor: '#eedaf0',
    borderWidth: 1,
    borderColor: '#8A2BE2',
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  urgentDayTitle: {
    color: '#FF0000',
  },
  dayDate: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  dayTitle: {
    fontSize: 14,
    color: '#00000',
    fontWeight: 'bold',
    marginTop: 8
  },
  urgentDayDate: {
    color: '#8A2BE2',
    fontWeight: '600',
  },
  daysLeft: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
    marginTop: 12,
  },
  urgentDaysLeft: {
    color: '#8A2BE2',
    fontWeight: 'bold',
    fontSize: 18,
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
    marginTop: 32,
  },
});
