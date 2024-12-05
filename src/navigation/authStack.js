import React from 'react'
import {LoginScreen, SignupScreen, MainScreen} from '../screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'  
const Stack = createNativeStackNavigator();


const AuthStack = () => {
  return (
    <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName='Main'
    >
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