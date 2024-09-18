/*|==========================================================================================================================
 *| File: HomeScreen.js
 *| Author: Wesly Barayuga
 *| Date: 9/17/2024
 *| Purpose: ///
 *|
 *| Revision History:
 *|   - version 0.0 :: 09/17/2024 :: Initial build :: Wesly Barayuga
 *|
 *| User Notice:
 *|   - ///
 *|==========================================================================================================================*/

 import React from 'react';
 import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
 import { LinearGradient } from 'expo-linear-gradient';
 
 const LoginScreen = ({ navigation }) => {
   return (
     <LinearGradient colors={['#4E1818', '#AE3838']} start={{ x: 1, y: 0 }} end={{ x: -0.15, y: 0.1 }} style={styles.container}>
       
       {/* Display "Sign In" title */}
       <Text style={styles.title}>Your Pantry and stuff</Text>
 
       {/* Display logo */}
       <Image source={require('../assets/icon.png')} style={styles.logo} />

     </LinearGradient>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     paddingHorizontal: 16,
   },
   title: {
     fontSize: 36,
     fontWeight: 'bold',
     color: '#fff',
     marginBottom: 40,
     textAlign: 'center',
   },
   logo: {
     width: 200,
     height: 200,
     position: 'absolute',
     zIndex: 0,
     top: 20,
     right: 220,
   },
 });
 
 export default LoginScreen;
 
 