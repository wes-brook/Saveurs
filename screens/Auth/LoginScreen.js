/* ==========================================================================================================================
 *  File: LoginScreen.js
 *  Author: Wesly Barayuga
 *  Date: 9/17/2024
 *  Purpose: Display UI for user sign in and handle user authentication events
 * 
 *  Revision History:
 *    - version 0.0 :: 09/17/2024 :: Initial build :: Wesly Barayuga
 * 
 *  User Notice:
 *    - Need to change this file name to "SignInScreen.js"
 * ========================================================================================================================== */

import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from '../../node_modules/firebase/auth';

const LoginScreen = ({ navigation, setIsAuthenticated }) => {
  const logoMainPath = require('../../assets/icon_no_title_no_stars.png');
  const logoLeftPath = require('../../assets/icon_left_star.png');
  const logoRightPath = require('../../assets/icon_right_star.png');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  // Create separate bounce values for each logo
  const bounceValueMain = useRef(new Animated.Value(1)).current;
  const bounceValueLeft = useRef(new Animated.Value(1)).current;
  const bounceValueRight = useRef(new Animated.Value(1)).current;

  const emailShake = useRef(new Animated.Value(0)).current;
  const passwordShake = useRef(new Animated.Value(0)).current;

  // #### DEBUG PURPOSES ####
  useEffect(() => console.log(`[${new Date().toLocaleTimeString()}] Launching "LoginScreen.js"`), []); // #### DEBUG ####

  // Function to animate logos
  const startBounceAnimation = (bounceValue, interval) => {
    const bounce = () => {
      Animated.sequence([
        Animated.timing(bounceValue, { toValue: 1.1, duration: 500, useNativeDriver: true }),
        Animated.timing(bounceValue, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]).start();
    };

    bounce();
    const animationInterval = setInterval(bounce, interval);
    return animationInterval;
  };

  useEffect(() => {
    // Start animations with different intervals
    const intervalMain = startBounceAnimation(bounceValueMain, 3000); // 3 seconds for main logo
    const intervalLeft = startBounceAnimation(bounceValueLeft, 2000); // 2 seconds for left logo
    const intervalRight = startBounceAnimation(bounceValueRight, 1000); // 1 second for right logo

    // Clear intervals on component unmount
    return () => {
      clearInterval(intervalMain);
      clearInterval(intervalLeft);
      clearInterval(intervalRight);
    };
  }, [bounceValueMain, bounceValueLeft, bounceValueRight]);

  // Function to shake input fields if user taps "Sign In" button without providing input
  const shakeInput = (inputShake) => {
    Animated.sequence([
      Animated.timing(inputShake, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(inputShake, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(inputShake, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(inputShake, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  // Function to handle user login
  const handleSignIn = async () => {
    if (!email) {
      shakeInput(emailShake);
      return;
    }

    if (!password) {
      shakeInput(passwordShake);
      return;
    }

    setLoading(true);
    try {
      console.log(`[${new Date().toLocaleDateString()}] Running user login...`);
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      console.log(`[${new Date().toLocaleDateString()}] User logged in successfully...`);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      Alert.alert('Invalid email or password. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#4E1818', '#AE3838']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Animated.Image source={logoMainPath} style={[styles.logo, { transform: [{ scale: bounceValueMain }] }]} />
      <Animated.Image source={logoLeftPath} style={[styles.logo, { transform: [{ scale: bounceValueLeft }] }]} />
      <Animated.Image source={logoRightPath} style={[styles.logo, { transform: [{ scale: bounceValueRight }] }]} />
      <View style={styles.inputContainer}>
        <Animated.View style={{ transform: [{ translateX: emailShake }] }}>
          <TextInput 
            style={styles.input} 
            value={email} 
            placeholder="Enter Email" 
            keyboardType="email-address" 
            autoCapitalize="none" 
            onChangeText={(text) => setEmail(text)} 
          />
        </Animated.View>

        <Animated.View style={{ transform: [{ translateX: passwordShake }] }}>
          <TextInput 
            style={styles.input} 
            value={password} 
            placeholder="Enter Password" 
            secureTextEntry={true} 
            autoCapitalize="none" 
            onChangeText={(text) => setPassword(text)} 
          />
        </Animated.View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={async () => {
          const success = await handleSignIn();
          if (success) {
            navigation.navigate("HomeScreen");
          }
        }}
      >                 
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.accountText}>Don't have an Account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
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
