// NextScreen.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const NextScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the next page!</Text>
    </View>
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
    color: '#4CAF50',
    marginBottom: 20,
  },
});

export default NextScreen;
