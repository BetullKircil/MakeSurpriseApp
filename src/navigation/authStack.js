import React from 'react'
import {LoginScreen, SignupScreen, MainScreen, 
  HomePageScreen, CalendarScreen, UserCustomizeSurpriseScreen,
  MakeSurpriseForYourself, UserProfileScreen, UserProfileInfoScreen, 
  UserAddressInfoScreen, CargoTrackingScreen, EMailChangeScreen, 
  PasswordChangeScreen, AnnouncementPreferencesScreen, LogoutScreen, 
  SurveyScreen, MakeSurpriseForYourLovedScreen, AddUserRelative, OrderSummaryScreen
 } from '../screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'  
const Stack = createNativeStackNavigator();


const AuthStack = () => {
  return (
    <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName='Main'
    >
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
      <Stack.Screen 
          name="HomePageScreen" 
          component={HomePageScreen} 
          options={{ headerShown: false }} 
        />
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
    </Stack.Navigator>
  )
}

export default AuthStack