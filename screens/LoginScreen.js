/*|==========================================================================================================================
 *| File: LoginScreen.js
 *| Author: Wesly Barayuga
 *| Date: 9/17/2024
 *| Purpose: Display UI for user sign in and handle user authentication events
 *|
 *| Revision History:
 *|   - version 0.0 :: 09/17/2024 :: Initial build :: Wesly Barayuga
 *|
 *| User Notice:
 *|   - Need to change this file name to "SignInScreen.js"
 *|==========================================================================================================================*/

import React, {useState} from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message)
    } finally {
      setLoading(false);
    }
  }

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert("Check your emails");
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient colors={['#4E1818', '#AE3838']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.container}>
      
      {/* Display "Sign In" title */}
      <Text style={styles.title}>Sign In</Text>

      {/* Display logo */}
      <Image source={require('../assets/icon.png')} style={styles.logo} />

      {/* Display & handle user inputs for login */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value = {email} placeholder="Enter Email" keyboardType="email-address" autoCapitalize="none" onChangeText={(text) => setEmail(text)}/>
        <TextInput style={styles.input} value = {password} placeholder="Enter Password" secureTextEntry={true} autoCapitalize="none" onChangeText={(text) => setPassword (text)}/>
        
        {/* Handle "Forgot Password" transition to "ForgotPassword.js" */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Handle "Next" button transition to "HomeScreen.js" */}
      {/*navigation.navigate('HomeScreen')}>*/}
      <TouchableOpacity style={styles.button} onPress={signIn}>                 
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* Handle "Sign Up" button transition to "SignUp.js" */}
      <View style={styles.signUpContainer}>
        <Text style={styles.accountText}>Don't have an Account? </Text>
        {/*navigation.navigate('SignUp')}>*/}
        <TouchableOpacity onPress={signUp}>                                     
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: 330,
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 10,
  },
  forgotPassword: {
    color: '#FFAA7B',
    alignSelf: 'flex-end',
    marginLeft: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF701F',
    padding: 15,
    borderRadius: 8,
    width: 330,
    alignItems: 'center',
    marginBottom: 30,
    width: 300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 20,
    bottom: 30,
    marginRight: 90,
  },
  accountText: {
    color: '#fff',
  },
  signUpText: {
    color: '#FFAA7B',
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 200,
    position: 'absolute',
    zIndex: 0,
    top: 230,
    right: 200,
  },
});

export default LoginScreen;

