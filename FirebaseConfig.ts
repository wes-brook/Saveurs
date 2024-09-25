/* ==========================================================================================================================
 *  File: FirebaseConfig.ts
 *  Author: Wesly Barayuga
 *  Date: 9/24/2024
 *  Purpose: Configure settings for the purposes of user authentication within this app
 * 
 *  Revision History:
 *    - version 0.0 :: 09/24/2024 :: Initial build :: Wesly Barayuga
 * 
 *  User Notice:
 *    - ///
 * ========================================================================================================================== */

// SDK imports
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTwcU2BqvCcerQEDCbPvTMImb52vT3gew",
  authDomain: "saveurs-396d9.firebaseapp.com",
  projectId: "saveurs-396d9",
  storageBucket: "saveurs-396d9.appspot.com",
  messagingSenderId: "222865260158",
  appId: "1:222865260158:web:d6cfe016730fc4f529622f",
  measurementId: "G-NZDG1F9ZQ5"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence for React Native
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});
