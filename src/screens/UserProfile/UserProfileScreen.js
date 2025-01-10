import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import BottomBarNavigation from "../../components/common/BottomBarNavigation";
import userInfoIcon from '@/assets/images/userInfo.png';
import locationNotebookIcon from '@/assets/images/locationNotebook.png';
import cargoTraceIcon from '@/assets/images/cargoTrace.png';
import passwordIcon from '@/assets/images/password.png';
import announceIcon from '@/assets/images/announce.png';
import MenuItem from '../../components/UserProfile/MenuItem';
import LogoutModal from '../../components/UserProfile/LogoutModal';
import logoutIcon from '@/assets/images/logout.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncStorage from '../../helper/useAsyncStorage';

const UserProfileScreen = ({ navigation }) => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('profile');
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { label: 'Kullanıcı Bilgilerim', icon: userInfoIcon, screen: 'UserProfileInfoScreen' },
    { label: 'Adres Defterim', icon: locationNotebookIcon, screen: 'UserAddressInfoScreen' },
    { label: 'Kargo Takibi', icon: cargoTraceIcon, screen: 'CargoTrackingScreen' },
    { label: 'Şifre Değişikliği', icon: passwordIcon, screen: 'PasswordChangeScreen' },
    { label: 'Duyuru Tercihlerim', icon: announceIcon, screen: 'AnnouncementPreferencesScreen' },
  ];

  const { getData } = useAsyncStorage();

  const handleLogout = async (navigation) => {
    try {
      const UserId = Number(await getData("userID"));
      console.log("logout userId", UserId);
      await AsyncStorage.removeItem("userID"); 
      console.log("Oturum kapatıldı");
      console.log("Oturum kapatıldı userId", UserId);
        navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Çıkış işlemi sırasında hata oluştu:", error);
    }
  };

  const handleMenuActivity = (menu) => {
    setSelectedMenu(menu);
    navigation.navigate(menu);
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/wallet.png')} style={styles.icon} />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Menüde Ara..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.menuContainer}>
        {filteredMenuItems.map((item, index) => (
          <MenuItem
            key={index}
            label={`${item.label} >`}
            icon={item.icon}
            onPress={() => navigation.navigate(item.screen)}
          />
        ))}
        <MenuItem
          label="Oturumu Kapat >"
          icon={logoutIcon}
          onPress={() => setLogoutModalVisible(true)}
        />
      </View>

      <LogoutModal
        visible={logoutModalVisible}
        onCancel={() => setLogoutModalVisible(false)}
        onConfirm={() => {
          setLogoutModalVisible(false);
          handleLogout(navigation);
        }}
      />

      <BottomBarNavigation selectedMenu={selectedMenu} navigation={navigation} onNavigate={handleMenuActivity} />
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 20,
    marginTop: 20,
  },
  searchInput: {
    width: '90%',
    height: 50,
    backgroundColor: '#f7f5f8',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  menuContainer: {
    width: '90%',
    
  },
  menuItem: {
    backgroundColor: '#ffb3ff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  icon: {
    width: 70,
    height: 70,
  },
});
