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
import { IngredientsProvider } from '../ui/IngredientsContext';
//---------------------------------------------------------------IMPORTS---=



// HomeScreen component
const HomeScreen = ({ }) => {

  useEffect(() => console.log(`[${new Date().toLocaleTimeString()}] Launching "HomeScreen.js"`), []); // #### DEBUG ####

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
        </View>
    
        {/* Pantry Grid & Recipe Stack */}
        <View style={styles.contentContainer}>
          <IngredientsProvider>
            <GridList/>
            <RecipeStack/>
          </IngredientsProvider>
        </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,        // Increase size here
    height: 100,       // Increase size here
    position: 'absolute',  // Use absolute positioning
    transform: [{ translateX: -30 }], // Offset by half the width
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
 