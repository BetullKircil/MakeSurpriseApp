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
import { createNativeStackNavigator } from '@react-navigation/native-stack'  
const Stack = createNativeStackNavigator();

const index = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
        <Stack.Screen 
          name="Main" 
          component={MainScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="HomePageScreen" 
          component={HomePageScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="CalendarScreen" 
          component={CalendarScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="UserCustomizeSurpriseScreen" 
          component={UserCustomizeSurpriseScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="UserProfileScreen" 
          component={UserProfileScreen} 
          options={{ headerShown: false }} 
        /> 
        <Stack.Screen 
          name="UserProfileInfoScreen" 
          component={UserProfileInfoScreen} 
          options={{ headerShown: false }} 
        />  
        <Stack.Screen 
          name="UserAddressInfoScreen" 
          component={UserAddressInfoScreen} 
          options={{ headerShown: false }} 
        /> 
        <Stack.Screen 
          name="CargoTrackingScreen" 
          component={CargoTrackingScreen} 
          options={{ headerShown: false }} 
        /> 
        <Stack.Screen 
          name="EMailChangeScreen" 
          component={EMailChangeScreen} 
          options={{ headerShown: false }} 
        />  
        <Stack.Screen 
          name="PasswordChangeScreen" 
          component={PasswordChangeScreen} 
          options={{ headerShown: false }} 
        /> 
        <Stack.Screen 
          name="AnnouncementPreferencesScreen" 
          component={AnnouncementPreferencesScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="LogoutScreen" 
          component={LogoutScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SurveyScreen" 
          component={SurveyScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
  )
}

export default index

const styles = StyleSheet.create({})