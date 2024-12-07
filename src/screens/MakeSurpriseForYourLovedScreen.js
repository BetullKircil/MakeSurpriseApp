import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const MakeSurpriseForYourLovedScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/users');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Veri çekilirken hata oluştu:', error);
      }
    };

    fetchData();
  }, []);

  const handleUserPress = (item) => {
    navigation.navigate('CustomizeYourSurprise', { user: item }); 
  };

  const handleAddUser = () => {
    navigation.navigate('AddUserRelative'); 
  };

  const renderItem = ({ item }) => {
    const initials = `${item.firstName[0]}${item.lastName[0]}`;
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => handleUserPress(item)}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.nameText}>{`${item.firstName} ${item.lastName}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {data.length === 0 ? ( 
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Hiç kullanıcı bulunamadı!</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddUserRelative')}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      ) : ( 
        <>
          <Text style={styles.title}>Kayıtlı Sevdiklerin</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
        </>
      )}
    </View>
  );
};

export default MakeSurpriseForYourLovedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eedaf0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 20,
    marginTop: 30,
    color: '#8A2BE2',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    color: '#555',
    marginBottom: 20,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 16,
    color: '#333',
  },
});
