import { StyleSheet} from 'react-native'
import React from 'react'
import MainScreen from '../../src/screens/MainScreen'
import SignupScreen from '../../src/screens/SignupScreen'
import LoginScreen from '../../src/screens/LoginScreen'
import CalendarScreen from '../../src/screens/CalenderScreen'
import HomePageScreen from '../../src/screens/HomePageScreen'
import UserProfileScreen from '../../src/screens/UserProfileScreen' 
import UserProfileInfoScreen from '../../src/screens/UserProfileInfoScreen'
import UserCustomizeSurpriseScreen from '../../src/screens/UserCustomizeSurpriseScreen' 
import UserAddressInfoScreen from '../../src/screens/UserAddressInfoScreen'
import CargoTrackingScreen from '../../src/screens/CargoTrackingScreen'
import EMailChangeScreen from '../../src/screens/EMailChangeScreen' 
import AnnouncementPreferencesScreen from '../../src/screens/AnnouncementPreferencesScreen'
import PasswordChangeScreen from '../../src/screens/PasswordChangeScreen'
import LogoutScreen from '../../src/screens/LogoutScreen'
import SurveyScreen from '../../src/screens/SurveyScreen'
import RootNavigation from '../../src/navigation/rootNavigation'

const index = () => {
  console.log("hi")
  return <RootNavigation/>
}

export default index