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
 *    - ///
 * ========================================================================================================================== */




/*|==========================================================================================================================
 *|                                                   IMPORTS
 *|========================================================================================================================== */

import React, { useState } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons'; 

// Authentication screens
import WelcomeScreen from './screens/Auth/WelcomeScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import ForgotPassword from './screens/Auth/ForgotPassword';
import SignUp from './screens/Auth/SignUp';

// Core application screens
import HomeScreen from './screens/Tabs/HomeScreen';
import FavoritesScreen from './screens/Tabs/FavoritesScreen';
import SettingsScreen from './screens/Tabs/SettingsScreen';

/*|==========================================================================================================================
 *|                                                   APP FLOW
 *|========================================================================================================================== */

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// ///
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

// ///
function getScreenOptions({ route }) {
  const icons = {
    HomeScreen: 'home-outline',
    Favorites: 'star-outline',
    Settings: 'settings',
  };

  return {
    tabBarIcon: ({ color, size }) => {
      const iconName = icons[route.name] || 'default-icon'; // Fallback icon
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarShowLabel: false,
    tabBarActiveTintColor: "#FFAA7B",
    tabBarInactiveTintColor: "gray",
    tabBarStyle: [{ display: 'flex' }, null],
  };
}

// ///
function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={getScreenOptions}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}


// ///
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar style="light" />
      {isAuthenticated ? <HomeTabs /> : <AuthStack setIsAuthenticated={setIsAuthenticated} />}
    </NavigationContainer>
  );
}

