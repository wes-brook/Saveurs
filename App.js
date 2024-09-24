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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SettingsScreen from './screens/SettingsScreen';
import ForgotPassword from './screens/ForgotPassword';
import SignUp from './screens/SignUp';

import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons'; // For tab bar icons

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack({ setIsAuthenticated }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="LoginScreen">
        {(props) => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
      </Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'HomeScreen') {
            iconName = 'home-outline';
          } else if (route.name === 'Favorites') {
            iconName = 'star-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
      })}
      tabBarOptions={{
        activeTintColor: '#FFAA7B',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar style="light" />
      {isAuthenticated ? <HomeTabs /> : <AuthStack setIsAuthenticated={setIsAuthenticated} />}
    </NavigationContainer>
  );
}

