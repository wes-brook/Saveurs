/* ==========================================================================================================================
 *  File: SignUp.js
 *  Author: Wesly Barayuga
 *  Date: 9/17/2024
 *  Purpose: ///
 * 
 *  Revision History:
 *    - version 0.0 :: 09/17/2024 :: Initial build :: Wesly Barayuga
 * 
 *  User Notice:
 *    - ///
 * ========================================================================================================================== */

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

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert("Account created! You may now sign in.");
      return true;  // Return true on success
    } catch (error) {
      console.log(error);
      alert("Sign up failed: " + error.message);
      return false; // Return false on failure
    } finally {
      setLoading(false); // Note: "finally" will always run no matter what
    }
  };
  

   return (
     <LinearGradient colors={['#4E1818', '#AE3838']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={styles.container}>
       
       {/* Display "Sign In" title */}
       <Text style={styles.title}>Sign Up</Text>
 
       {/* Display logo */}
       <Image source={require('../assets/icon.png')} style={styles.logo} />
 
       {/* Display & handle user inputs for login */}
       <View style={styles.inputContainer}>
         <TextInput style={styles.input} autoCapitalize="none" placeholder="Enter Email" keyboardType="email-address" onChangeText={(text) => setEmail(text)}/>
         <TextInput style={styles.input} autoCapitalize="none" placeholder="Enter Password" secureTextEntry={true} onChangeText={(text) => setPassword (text)}/>
       </View>
 
       {/* Handle "Next" button transition to "HomeScreen.js" */}
       <TouchableOpacity style={styles.button} onPress={async () => {const success = await signUp(); if (success) {navigation.navigate('LoginScreen');}}}>
        <Text style={styles.buttonText}>Create Account</Text>
       </TouchableOpacity>
 
       {/* Handle "Sign Up" button transition to "SignUp.js" */}
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
 
 