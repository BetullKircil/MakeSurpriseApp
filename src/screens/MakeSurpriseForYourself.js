import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ipConfig} from "../../scripts/enums"

const MakeSurpriseForYourself = ({route}) => {
    const { userRelativeType} = route.params;
    const [data, setData] = useState([]);
    const [userRelativeProfile, setUserProfile] = useState([]);
    const navigation = useNavigation(); 
  
    const handleUserPress = (item) => {
      navigation.navigate('CustomizeYourSurprise', { user: item }); 
    };
    const getData = async (key) => {
      try {
        const value = await AsyncStorage.getItem(key);
        return value;
      } catch (error) {
        console.error("Hata oluştu:", error);
      }
    }
    useEffect( () => {
      getAllProfiles();
    },
      [])
    
    async function getAllProfiles(){
      const UserId = Number(await getData("userID"));
      const response = await fetch(`${ipConfig}Profile/GetAllProfiles?UserId=${UserId}&UserRelativeType=${userRelativeType}`)
      const data = await response.json();
      console.log("data: ", data["$values"])
      setUserProfile(data["$values"]);
    }

    const renderItem = ({ item }) => {
      const initials = `${item.firstName[0]}${item.lastName[0]}`;
      return (
        <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleUserPress(item.userRelativeId)}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.nameText}>{`${item.firstName} ${item.lastName}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteEvent()} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Sil</Text>
        </TouchableOpacity>
    </View>
      );
    };
  
    return (
      <View style={styles.container}>
        {userRelativeProfile.length === 0 ? ( 
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Kayıtlı Profil Bulunamadı!</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddUserRelative', {userRelativeType: userRelativeType})}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : ( 
          <>
            <Text style={styles.title}>Kayıtlı Profillerin</Text>
            <FlatList
              data={userRelativeProfile}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.listContainer}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddUserRelative', {userRelativeType: userRelativeType})}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

export default MakeSurpriseForYourself

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
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: 10,
    },
    deleteButton: {
      backgroundColor: "red",
      paddingVertical: 24,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginLeft: 20
    },
    deleteButtonText: {
      color: "white",
      fontWeight: "bold",
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
      width: 220
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
  