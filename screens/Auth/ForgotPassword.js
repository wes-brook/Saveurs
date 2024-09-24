/* ==========================================================================================================================
 *  File: ForgotPassword.js
 *  Author: Wesly Barayuga
 *  Date: 9/17/2024
 *  Purpose: This screen allows users to reset their password using their email address
 * 
 *  Revision History:
 *    - version 0.0 :: 09/17/2024 :: Initial build :: Wesly Barayuga
 * 
 *  User Notice:
 *    - ///
 * ========================================================================================================================== */

 import React from 'react';
 import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
 import { LinearGradient } from 'expo-linear-gradient';
 
 const ForgotPassword = ({ navigation }) => {
   return (
     <LinearGradient colors={['#4E1818', '#AE3838']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={styles.container}>
       
       {/* Display "Sign In" title */}
       <Text style={styles.title}>Reset Password</Text>
 
       {/* Display logo */}
       <Image source={require('../assets/icon.png')} style={styles.logo} />
 
       {/* Display & handle user inputs for login */}
       <View style={styles.inputContainer}>
         <TextInput style={styles.input} placeholder="Enter Email" keyboardType="email-address" />
         <TextInput style={styles.input} placeholder="Enter Password" secureTextEntry={true} />
         <TextInput style={styles.input} placeholder="Enter Password again" secureTextEntry={true} />
       </View>
 
       {/* Handle "Next" button transition to "HomeScreen.js" */}
       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
         <Text style={styles.buttonText}>Reset Password</Text>
       </TouchableOpacity>
 
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
     top: 237,
     right: 200,
   },
 });
 
 export default ForgotPassword;
 
 