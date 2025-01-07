import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/wallet.png')} style={styles.icon} />
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
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
    backgroundColor: '#eedaf0',
    alignItems: 'center',
    paddingTop: 40,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalMessage: { fontSize: 14, textAlign: 'center', marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButton: { backgroundColor: '#f00' },
  modalButtonText: { color: 'white', fontWeight: 'bold' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 20,
    marginTop: 30
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileName: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  walletContainer: {
    alignItems: 'center',
  },
  walletTextContainer: {
    flexDirection: 'row'
  },
  walletText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  walletBalance: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  balanceButton: {
    backgroundColor: '#ff66b2',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
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
    fontWeight: 'bold'
  },
  icon: {
    width: 50,
    height: 50,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  budgetIcon: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
});

