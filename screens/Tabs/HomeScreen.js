/* ==========================================================================================================================
 *  File: HomeScreen.js
 *  Author: Wesly Barayuga
 *  Date: 9/17/2024
 *  Purpose: Facilitate user ingredient input system and automated recipe generation. 
 * 
 *  Features:   >> HomeScreen     ///
 * 
 *  Revision History:
 *    - version 0.0 :: 09/17/2024 :: Initial build :: Wesly Barayuga
 * 
 *  User Notice:
 *    - ///
 * ========================================================================================================================== */


//---IMPORTS---------------------------------------------------------------=
import React, {useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GridList from '../ui/GridList';
import RecipeStack from '../ui/RecipeStack';
//---------------------------------------------------------------IMPORTS---=



// HomeScreen component
const HomeScreen = ({ navigation }) => {

  useEffect(() => console.log(`[${new Date().toLocaleTimeString()}] Launching "HomeScreen.js"`), []); // #### DEBUG ####

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    console.log("User scrolled to: ", scrollY);
  }

  /* **** IMPORTANT: JS Component Return Type Crash Course ****
   *  - .js components return JSX (JavaScript XML) code that allows us to write HTML-like code in JS
   *  - This JSX code is used by React Native to render the UI to the device screen
   *  - React handles the conversion from JSX into the corresponding native components that the device understands
   */
  return (
    <LinearGradient colors={['#4E1818', '#AE3838']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../../assets/icon_no_title.png')} style={styles.logo} />
          <Text style={styles.headerText}>Your Pantry</Text>
        </View>
    
        {/* Pantry Grid */}
        <View style={styles.contentContainer}>
          <GridList/>
          <RecipeStack/>
        </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pantryGrid: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '50%',
    justifyContent: 'space-between',
  },
  pantryItem: {
    width: '45%',
    aspectRatio: 1, // makes each item square
    backgroundColor: '#E0E0E0', // light grey background for empty items
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 28,
    color: '#8E001C', // dark red for the plus icon
    fontWeight: 'bold',
  },
});

export default HomeScreen;
 