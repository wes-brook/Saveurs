/* ==========================================================================================================================
 *  File: App.js
 *  Author: Wesly Barayuga
 *  Date: 9/17/2024
 *  Purpose: Facilitate app work flow
 * 
 *  Revision History:
 *    - version 0.0 :: 09/17/2024 :: Initial build :: Wesly Barayuga
 * 
 *  User Notice:
 *    - Will want to move navigation flow into seperate js file in future [9/17/24]
 * ========================================================================================================================== */

import React, { useState } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ForgotPassword from './screens/ForgotPassword';
import SignUp from './screens/SignUp';
import { StatusBar } from 'expo-status-bar';

const AuthStack = createStackNavigator();
function AuthStackScreen({ setIsAuthenticated }) {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="LoginScreen" options={{ headerShown: false }}>
        {(props) => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
      </AuthStack.Screen>
      <AuthStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
}

const MainStack = createStackNavigator();
function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
    </MainStack.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar style="light" />
      {isAuthenticated ? <MainStackScreen /> : <AuthStackScreen setIsAuthenticated={setIsAuthenticated} />}
    </NavigationContainer>
  );
}
