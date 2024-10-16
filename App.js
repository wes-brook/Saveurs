/* ==========================================================================================================================
 *  File: App.js
 *  Author: Wesly Barayuga
 *  Date: 9/17/2024
 *  Purpose: Entry point into this mobile application. Handle user navigation flow. 
 * 
 *  How to run: 1) For initial setup, run "npm install" to install required dependencies
 *              2) Execute "npx expo start" to start the development server
 *              3) Scan the QR code with your mobile device to launch the app
 * 
 *  Features:   >> App            Main function
 *              >> AuthStack      Screen navigation container for user authentication and login
 *              >> HomeTabs       Screen navigation container for bottom navigation bar
 * 
 *  Revision History:
 *    - version 0.0 :: 09/17/2024 :: Initial build :: Wesly Barayuga
 * 
 *  User Notice:
 *    - This app is a prototype that utilizes an independant mobile app called "Expo Go" which can be downloaded via IOS for Android Play
 * 
 * ========================================================================================================================== */




//---IMPORTS---------------------------------------------------------------=
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
//---------------------------------------------------------------IMPORTS---=




//---APP-FLOW-----------------------------------------------------------------------------------=

const StackAuth = createStackNavigator();
const StackTabs = createBottomTabNavigator();


// Entry point into our mobile application
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar style="light" />
      {/* {isAuthenticated ? <HomeTabs /> : <AuthStack setIsAuthenticated={setIsAuthenticated} />} */}
      <HomeTabs />
      </NavigationContainer>
  );
}

// Screen navigation container for user authentication and login
function AuthStack({ setIsAuthenticated }) {
  return (
    <StackAuth.Navigator screenOptions={{ headerShown: false }}>
      <StackAuth.Screen name="Welcome" component={WelcomeScreen} />
      <StackAuth.Screen name="LoginScreen">
        {(props) => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
      </StackAuth.Screen>
      <StackAuth.Screen name="SignUp" component={SignUp} />
      <StackAuth.Screen name="ForgotPassword" component={ForgotPassword} />
    </StackAuth.Navigator>
  );
}

// Helper function for screen navigation container of bottom navigation bar
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

// Screen navigation container for bottom navigation bar
function HomeTabs() {
  return (
    <StackTabs.Navigator screenOptions={getScreenOptions}>
      <StackTabs.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <StackTabs.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: false }} />
      <StackTabs.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
    </StackTabs.Navigator>
  );
}

//----------------------------------------------------------------------------------APP-FLOW---=