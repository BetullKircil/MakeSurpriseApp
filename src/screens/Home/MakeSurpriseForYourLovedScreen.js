import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import useAsyncStorage from '../../helper/useAsyncStorage';
import { ipConfig, noFoundSavedProfile, savedLovedOnes } from "../../../scripts/enums";
import DeleteUserRelativeModal from '../../components/UserProfile/DeleteUserRelativeModal';

const MakeSurpriseForYourLovedScreen = ({ route }) => {
  const { userRelativeType } = route.params;
  const [data, setData] = useState([]);
  const [userRelativeId, setUserRelativeId] = useState([]);
  const [userRelativeProfile, setUserProfile] = useState([]);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const { getData } = useAsyncStorage();

  useEffect(() => {
    getAllProfiles();
  }, []);

  async function deleteEvent(id) {
    const response = await fetch(`${ipConfig}Profile/DeleteProfile?userRelativeId=${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      await getAllProfiles();
    }
  };

  async function getAllProfiles() {
    setLoading(true);
    try {
      const UserId = Number(await getData("userID"));
      const response = await fetch(`${ipConfig}Profile/GetAllProfiles?UserId=${UserId}&UserRelativeType=${userRelativeType}`);
      const data = await response.json();
      setUserProfile(data["$values"] || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleUserPress = (userRelativeId) => {
    navigation.navigate('UserCustomizeSurpriseScreen', { user: userRelativeId });
  };

  const renderItem = ({ item }) => {
    const initials = `${item.firstName[0]}${item.lastName[0]}`;
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => handleUserPress(item.userRelativeId)}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View>
            <Text style={styles.nameText}>{`${item.firstName} ${item.lastName}`}</Text>
            <Text style={styles.tagText}>{`(${item.tag})`}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setLogoutModalVisible(true);
            setUserRelativeId(item.userRelativeId);
          }}
          style={styles.deleteButton}>
          <Image
            source={require('@/assets/images/delete-icon.png')}
            style={styles.deleteIcon}
          />
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
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200EE" />
        </View>
      ) : userRelativeProfile.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{noFoundSavedProfile}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddUserRelative', { userRelativeType: userRelativeType })}>
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
            contentContainerStyle={styles.listContent}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddUserRelative', { userRelativeType: userRelativeType })}>
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
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6200EE',
    textAlign: 'center',
    marginBottom: 30,
  },
  listContent: {
    paddingBottom: 80,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
    padding: 18,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  nameText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
  },
  tagText: {
    fontSize: 14,
    color: '#666666',
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    width: 24,
    height: 24,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 20,
  },
});
