import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import BottomBarNavigation from "../components/BottomBarNavigation";
import userInfoIcon from '@/assets/images/userInfo.png';
import locationNotebookIcon from '@/assets/images/locationNotebook.png';
import cargoTraceIcon from '@/assets/images/cargoTrace.png';
import passwordIcon from '@/assets/images/password.png';
import announceIcon from '@/assets/images/announce.png';

const UserProfileScreen = ({navigation}) => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false); 
  const [selectedMenu, setSelectedMenu] = useState('profile');

  const handleMenuActivity = (menu) => {
    setSelectedMenu(menu); 
    navigation.navigate(menu);
  };
      const menuItems = [
        { label: 'Kullanıcı Bilgilerim', icon: userInfoIcon, screen: 'UserProfileInfoScreen'},
        { label: 'Adres Defterim', icon: locationNotebookIcon, screen: 'UserAddressInfoScreen'},
        { label: 'Kargo Takibi', icon: cargoTraceIcon, screen: 'CargoTrackingScreen'},
        { label: 'Şifre Değişikliği', icon: passwordIcon, screen: 'PasswordChangeScreen'},
        { label: 'Duyuru Tercihlerim', icon: announceIcon, screen: 'AnnouncementPreferencesScreen'},
      ];
      const handleLogout = () => {
        console.log("Çıkış yapılmadı.");
        setLogoutModalVisible(true); 
      };
      const closeLogoutPopup = () => {
        console.log("Çıkış yapıldı.");
        setLogoutModalVisible(false); 
      };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.walletContainer}>
          <Image
            source={require('@/assets/images/wallet.png')} 
            style={styles.icon}
          />
        </View>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index}
           style={styles.menuItem}
           onPress={() => navigation.navigate(item.screen)}>
            <Image source={item.icon} style={styles.menuIcon} />
            <Text style={styles.menuText}>{item.label + " >"}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.menuContainer}>
          <TouchableOpacity
           style={styles.menuItem}
           onPress={handleLogout}>
            <Image source={require('@/assets/images/logout.png')} style={styles.menuIcon} />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={logoutModalVisible}
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Çıkış Yap</Text>
            <Text style={styles.modalMessage}>Hesabınızdan çıkış yapmak istediğinizden emin misiniz?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.modalButtonText}>Hayır</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={closeLogoutPopup}>
                <Text style={styles.modalButtonText}>Evet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <BottomBarNavigation selectedMenu={selectedMenu} navigation={navigation} onNavigate={handleMenuActivity}/>
    </View>
    
  );
}

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

