/* ==========================================================================================================================
 *  File: FavoritesScreen.js
 *  Author: Wesly Barayuga
 *  Date: 9/24/2024
 *  Purpose: ///
 * 
 *  Revision History:
 *    - version 0.0 :: 09/24/2024 :: Initial build :: Wesly Barayuga
 * 
 *  User Notice:
 *    - ///
 * ========================================================================================================================== */

import React, {useState} from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const FavoritesScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#4E1818', '#AE3838']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={styles.container}>
        <View style={styles.container}>
            <Image source={require('../../assets/icon.png')} style={styles.logo} />
            <Text style={styles.title}>Favorites</Text>
        </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    title: {
        fontSize: 28,
        color: 'white',
        fontWeight: 'bold',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
});

export default FavoritesScreen;

