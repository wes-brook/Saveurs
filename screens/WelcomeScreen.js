/*|==========================================================================================================================
 *| File: WelcomeScreen.js
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
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
    const { height } = Dimensions.get('window');
    const linePosition = height * 0.618; // 1/4 from the bottom

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('LoginScreen')}>
          <LinearGradient colors={['#AE3838', '#4E1818']} style={styles.container}>
            <Image source={require('../assets/icon.png')} style={styles.logo} />
            <View style={[styles.line, { top: linePosition }]} />
            <Text style={styles.buttonText}>Tap to begin</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  line: {
    position: 'absolute',
    height: 3, // Increased height for the line (adjust as needed)
    width: '55%', // Full width
    backgroundColor: '#1D192B', // Color: Black
    borderRadius: 2.5, // Rounded edges (optional)
  },
  buttonText: {
    color: '#ffff',
    fontSize: 16,
    bottom: 135,
    fontWeight: '200',
  },
});

export default WelcomeScreen;
