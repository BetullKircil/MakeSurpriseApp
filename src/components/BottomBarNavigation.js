import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'

const BottomBarNavigation = ({navigation}) => {
    const [selectedMenu, setSelectedMenu] = useState('home');
  return (
    <View style={styles.bottomNav}>
                <TouchableOpacity 
                    style={styles.navItem} 
                    onPress={() => navigation.navigate('HomePageScreen')}>
                    <Image
                    source={require('@/assets/images/home.png')}
                    style={styles.homeNavBarLogo}
                    />
                    {selectedMenu === 'home' && <View style={styles.redDot} />}
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.navItem} 
                    onPress={() => navigation.navigate('CalendarScreen')}>
                    <Image
                    source={require('@/assets/images/calender.png')}
                    style={styles.homeNavBarLogo}
                    />
                    {selectedMenu === 'calendar' && <View style={styles.redDot} />}
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.navItem} 
                    onPress={() => navigation.navigate('UserCustomizeSurpriseScreen')}>
                    <Image
                    source={require('@/assets/images/shopping-basket.png')}
                    style={styles.homeNavBarLogo}
                    />
                    {selectedMenu === 'shopping' && <View style={styles.redDot} />}
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.navItem} 
                    onPress={() => navigation.navigate('UserProfileScreen')}>
                    <Image
                    source={require('@/assets/images/profile.png')}
                    style={styles.homeNavBarLogoForProfile}
                    />
                    {selectedMenu === 'profile' && <View style={styles.redDot} />}
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
        justifyContent: 'space-around',
        paddingVertical: 8,
        // backgroundColor: '#bd88ae',
        marginTop: 15,
        borderTopWidth: 1,
        borderColor: '#8A2BE2'
      },
      navItem: {
        alignItems: 'center',
      },
      homeNavBarLogo: {
        width: 30,
        height: 30,
        marginHorizontal: 5
      },
      redDot: {
        width: 8,
        height: 8,
        backgroundColor: 'red',
        borderRadius: 4,
        marginTop: 4, // İkonun hemen altına kırmızı noktayı ekler
      },
      homeNavBarLogoForProfile: {
        width: 35,
        height: 35,
        marginHorizontal: 5
      },
})