import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useCuisinePreference } from '../ui/CuisinePreference';

const SettingsScreen = () => {
  const { cuisinePreference, setCuisinePreference } = useCuisinePreference();

  useEffect(() => {
    console.log(`[${new Date().toLocaleTimeString()}] Launching "SettingsScreen.js"`);
  }, []);

  const handleCuisineChange = (value) => {
    console.log(`[${new Date().toLocaleTimeString()}] User selected cuisine: ${value}`);
    setCuisinePreference(value);
  };

  return (
    <LinearGradient colors={['#4E1818', '#AE3838']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.container}>
      <View style={styles.container}>
        <Image source={require('../../assets/icon_no_title.png')} style={styles.logo} />
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.label}>Cuisine Preference:</Text>
        <Picker
          selectedValue={cuisinePreference}
          onValueChange={handleCuisineChange}
          style={styles.picker}
        >
          <Picker.Item label="None" value="" />
          <Picker.Item label="Italian" value="Italian" />
          <Picker.Item label="Mexican" value="Mexican" />
          <Picker.Item label="Chinese" value="Chinese" />
          <Picker.Item label="Indian" value="Indian" />
          <Picker.Item label="American" value="American" />
        </Picker>
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
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginTop: 20,
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
  },
});

export default SettingsScreen;
