import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'

const BottomBarNavigation = ({selectedMenu, navigation}) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
          style={[styles.navItem, selectedMenu === 'home' && styles.selectedItem]} 
          onPress={() => navigation.navigate('HomePageScreen')}>
          <Image
          source={require('@/assets/images/home.png')}
          style={styles.navIcon}
          />
          {<Text style={styles.navLabel}>Anasayfa</Text>}
      </TouchableOpacity>
      
      <TouchableOpacity 
          style={[styles.navItem, selectedMenu === 'calendar' && styles.selectedItem]} 
          onPress={() => navigation.navigate('CalendarScreen')}>
          <Image
          source={require('@/assets/images/calender.png')}
          style={styles.navIcon}
          />
          {<Text style={styles.navLabel}>Takvim</Text>}
      </TouchableOpacity>
      
      <TouchableOpacity 
          style={[styles.navItem, selectedMenu === 'shopping' && styles.selectedItem]} 
          onPress={() => navigation.navigate('OrderSummaryScreen')}>
          <Image
          source={require('@/assets/images/shopping-basket.png')}
          style={styles.navIcon}
          />
          {<Text style={styles.navLabel}>Sepet</Text>}
      </TouchableOpacity>
      
      <TouchableOpacity 
          style={[styles.navItem, selectedMenu === 'profile' && styles.selectedItem]} 
          onPress={() => navigation.navigate('UserProfileScreen')}>
          <Image
          source={require('@/assets/images/profile.png')}
          style={styles.navIconProfile}
          />
          {<Text style={styles.navLabel}>Profil</Text>}
      </TouchableOpacity>
    </View>
  )
}

export default BottomBarNavigation

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-evenly',
    paddingVertical: 12,
    marginTop: 15,
    borderTopWidth: 2,
    borderColor: '#8A2BE2',
    backgroundColor: "#f5f1f7", 
    elevation: 10, 
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navIcon: {
    width: 25,
    height: 25,
  },
  navIconProfile: {
    width: 26,
    height: 26,
  },
  selectedItem: {
    backgroundColor: '#e6e6fa', 
    borderRadius: 8,
    paddingVertical: 4
  },
  navLabel: {
    fontSize: 11,
    color: '#807e79', 
    marginTop: 2,
  },
})
