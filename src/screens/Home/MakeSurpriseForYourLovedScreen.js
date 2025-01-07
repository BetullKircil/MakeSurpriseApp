import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import useAsyncStorage from '../../helper/useAsyncStorage';
import {ipConfig, noFoundSavedProfile, savedLovedOnes} from "../../../scripts/enums"
import DeleteUserRelativeModal from '../../components/UserProfile/DeleteUserRelativeModal';


const MakeSurpriseForYourLovedScreen = ({route}) => {
const { userRelativeType} = route.params;
const [data, setData] = useState([]);
const [userRelativeId, setUserRelativeId] = useState([]);
const [userRelativeProfile, setUserProfile] = useState([]);
const [logoutModalVisible, setLogoutModalVisible] = useState(false);
const navigation = useNavigation(); 
const [loading, setLoading] = useState(true);

const { getData } = useAsyncStorage();

useEffect( () => {
  console.log("heloooo")
  getAllProfiles();
},
  [])

async function deleteEvent(id){
  const response = await fetch(`${ipConfig}Profile/DeleteProfile?userRelativeId=${id}` , 
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      }
  )
  if(response.ok){
    await getAllProfiles();
  }
};
async function getAllProfiles(){
  setLoading(true);
  try{
    const UserId = Number(await getData("userID"));
    console.log("userId: ", UserId)
    console.log("kayıt etmek icin methoda girdi")
    const response = await fetch(`${ipConfig}Profile/GetAllProfiles?UserId=${UserId}&UserRelativeType=${userRelativeType}`)
    const data = await response.json();
    if(response.ok){
      console.log("Basarılı bir sekilde userRelative kaydedildi")
    }
    else{
      console.log("kayıt basarıılı degil")
    }
    setUserProfile(data["$values"] || []);
  }catch (error) {
    console.error("Veri yüklenirken hata oluştu:", error);
  } 
  finally {
    setLoading(false); 
  }
}

  const handleUserPress = (userRelativeId) => {
    navigation.navigate('UserCustomizeSurpriseScreen', { user: userRelativeId }); 
  };

  const renderItem = ({ item }) => {
    const initials = `${item.firstName[0]}${item.lastName[0]}`;
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleUserPress(item.userRelativeId)}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.itemStyle}>
            <Text style={styles.nameText}>{`${item.firstName} ${item.lastName}`}</Text>
            <Text style={styles.tagText}>{`(${item.tag})`}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
            // onPress={() => deleteEvent(item.userRelativeId)} 
            onPress={() => {
                setLogoutModalVisible(true)
                setUserRelativeId(item.userRelativeId)
                } 
              }
            style={styles.deleteButtonStyle} >
        <Image
              source={require('@/assets/images/delete-icon.png')}
              style={styles.deleteIconLogo}/>
        </TouchableOpacity>
          <DeleteUserRelativeModal
          visible={logoutModalVisible}
          addressId={userRelativeId}
          onCancel={() => setLogoutModalVisible(false)}
          onConfirm={() => {
            setLogoutModalVisible(false);
            deleteEvent(userRelativeId);
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : userRelativeProfile.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{noFoundSavedProfile}</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddUserRelative', {userRelativeType: userRelativeType})}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.title}>{savedLovedOnes}</Text>
          <FlatList
            data={userRelativeProfile}
            keyExtractor={(item, index) => index.toString()}
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

export default MakeSurpriseForYourLovedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eedaf0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 20,
    marginTop: 30,
    color: '#8A2BE2',
  },
  deleteIconLogo: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 20
  },
  deleteButtonStyle: {
    marginLeft: 20
  },
  emptyText: {
    fontSize: 20,
    color: '#555',
    marginBottom: 20,
    textAlign: "center"
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginBottom: 50
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
    backgroundColor: '#b2b8c2',
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
  tagText: {
    fontSize: 16,
    color: 'green',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
