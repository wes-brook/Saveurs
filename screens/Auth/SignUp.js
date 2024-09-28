/* ==========================================================================================================================
 *  File: SignUp.js
 *  Author: Wesly Barayuga
 *  Date: 9/17/2024
 *  Purpose: Account creation screen using email/password inputs
 * 
 *  Revision History:
 *    - version 0.0 :: 09/17/2024 :: Initial build :: Wesly Barayuga
 * 
 *  User Notice:
 *    - ///
 * ========================================================================================================================== */

 import React, {useState, useRef} from 'react';
 import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
 import { LinearGradient } from 'expo-linear-gradient';
 import { FIREBASE_AUTH } from '../../FirebaseConfig';
 import { createUserWithEmailAndPassword } from '../../node_modules/firebase/auth';
 
 const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  // Create Animated values for shake animation
  const emailShake = useRef(new Animated.Value(0)).current;
  const passwordShake = useRef(new Animated.Value(0)).current;

  // Shake animation function
  const shakeInput = (inputShake) => {
    Animated.sequence([
      Animated.timing(inputShake, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(inputShake, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(inputShake, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(inputShake, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const signUp = async () => {
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
      const response = await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created! You may now sign in.");
      return true; // Return true on success
    } catch (error) {
      alert("Sign up failed: " + error.message);
      return false; // Return false on failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#4E1818', '#AE3838']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <Image source={require('../../assets/icon.png')} style={styles.logo} />

      <View style={styles.inputContainer}>
        <Animated.View style={{ transform: [{ translateX: emailShake }] }}>
          <TextInput 
            style={styles.input} 
            autoCapitalize="none" 
            placeholder="Enter Email" 
            keyboardType="email-address" 
            onChangeText={(text) => setEmail(text)} 
          />
        </Animated.View>

        <Animated.View style={{ transform: [{ translateX: passwordShake }] }}>
          <TextInput 
            style={styles.input} 
            autoCapitalize="none" 
            placeholder="Enter Password" 
            secureTextEntry={true} 
            onChangeText={(text) => setPassword(text)} 
          />
        </Animated.View>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={async () => {
          const success = await signUp();
          if (success) {
            navigation.navigate('LoginScreen');
          }
        }}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.accountText}>
          Already have an Account?{" "}  
          <Text style={styles.signUpText} onPress={() => navigation.navigate('LoginScreen')}>
            Login
          </Text>
        </Text>
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
     marginTop: 57,
     bottom: 68,
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
 
 