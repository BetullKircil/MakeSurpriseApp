import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './authStack'; 
import UserStack from './userStack';

const RootNavigation = () => {
  const isAuth = false;  
  return (
       !isAuth ? <AuthStack /> : <UserStack /> 
  );
}

export default RootNavigation;
