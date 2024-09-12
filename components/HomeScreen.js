// HomeScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('NextScreen')}>
      <Text style={styles.title}>Saveurs</Text>
      <Text style={styles.subtitle}>Tap to continue...</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    //color: '#4CAF50',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: '#888',
    paddingTop: 100,
  },
});

export default HomeScreen;
