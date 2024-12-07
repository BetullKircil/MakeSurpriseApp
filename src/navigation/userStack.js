import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HomePageScreen, AnnouncementPreferencesScreen, CalendarScreen, EMailChangeScreen,
        PasswordChangeScreen, SurveyScreen, UserAddressInfoScreen, UserCustomizeSurpriseScreen, CargoTrackingScreen,
        UserProfileInfoScreen, UserProfileScreen, LogoutScreen, MakeSurpriseForYourself, MakeSurpriseForYourLovedScreen,
         AddUserRelative, OrderSummaryScreen } from '../screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'  
const Stack = createNativeStackNavigator();
const UserStack = () => {
  return (
    <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName='HomePageScreen'
    >
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
          name="OrderSummaryScreen" 
          component={OrderSummaryScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AddUserRelative" 
          component={AddUserRelative} 
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
        <Stack.Screen 
          name="MakeSurpriseForYourLovedScreen" 
          component={MakeSurpriseForYourLovedScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="MakeSurpriseForYourself" 
          component={MakeSurpriseForYourself} 
          options={{ headerShown: false }} 
        />
    </Stack.Navigator>
  )
}

export default UserStack

const styles = StyleSheet.create({})