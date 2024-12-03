import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BottomBarNavigation from "../components/BottomBarNavigation";

import userInfoIcon from '@/assets/images/userInfo.png';
import locationNotebookIcon from '@/assets/images/locationNotebook.png';
import cargoTraceIcon from '@/assets/images/cargoTrace.png';
import mailChangeIcon from '@/assets/images/mailChange.png';
import passwordIcon from '@/assets/images/password.png';
import announceIcon from '@/assets/images/announce.png';
import logoutIcon from '@/assets/images/logout.png';

const UserProfileScreen = ({navigation}) => {
      const menuItems = [
        { label: 'Kullanıcı Bilgilerim', icon: userInfoIcon, screen: 'UserProfileInfoScreen'},
        { label: 'Adres Defterim', icon: locationNotebookIcon, screen: 'UserAddressInfoScreen'},
        { label: 'Kargo Takibi', icon: cargoTraceIcon, screen: 'CargoTrackingScreen'},
        { label: 'E-Mail Değişikliği', icon: mailChangeIcon, screen: 'EMailChangeScreen'},
        { label: 'Şifre Değişikliği', icon: passwordIcon, screen: 'PasswordChangeScreen'},
        { label: 'Duyuru Tercihlerim', icon: announceIcon, screen: 'AnnouncementPreferencesScreen'},
        { label: 'Çıkış Yap', icon: logoutIcon, screen: 'LogoutScreen'},
      ];
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
      <BottomBarNavigation navigation={navigation}/>
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

