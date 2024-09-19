// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);