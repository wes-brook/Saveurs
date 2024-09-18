/*|==========================================================================================================================
 *| File: App.js
 *| Author: Wesly Barayuga
 *| Date: 9/17/2024
 *| Purpose: Facilitate app work flow
 *|
 *| Revision History:
 *|   - version 0.0 :: 09/17/2024 :: Initial build :: Wesly Barayuga
 *|
 *| User Notice:
 *|   - Will want to move navigation flow into seperate js file in future [9/17/24]
 *|==========================================================================================================================*/

import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ForgotPassword from './screens/ForgotPassword';
import SignUp from './screens/SignUp'
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar style='light'/> 
      <Stack.Navigator>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
