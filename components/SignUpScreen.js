import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const App = () => {
  return (
    <LinearGradient colors={['#4E1818', '#AE3838']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email or Phone Number"
          keyboardType="email-address" // Use 'phone-pad' for phone numbers
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry={true} // Hides the password input
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 16,
  },
  input: {
    height: 50,
    backgroundColor: '#ffff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#FF701F',
    padding: 15,
    borderRadius: 8,
    width: 330,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: 125,
    color: '#ffff',
    marginBottom: 30,
    textAlign: 'center'
  }
});

export default App;
