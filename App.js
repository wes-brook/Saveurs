// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// 
// 
// // Home screen
// function HomeScreen({ navigation }) {
//   return (
//     <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('NextScreen')}>
//       <Text style={styles.title}>Saveurs</Text>
//       <Text style={styles.subtitle}>Tap to continue...</Text>
//     </TouchableOpacity>
//   );
// }
// 
// // New screen
// function NextScreen() {
//   return (
//     <View>
//       <Text style={styles.title}>Welcome</Text>
//     </View>
//   );
// }
// 
// const Stack = createStackNavigator();
// 
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}} />
//         <Stack.Screen name="NextScreen" component={NextScreen} options={{ headerShown: false}} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
// 
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 48,
//     marginBottom: 20, // space between title and its surroundings
//   },
//   subtitle: {
//     fontSize: 20,
//     color: '#888',
//     paddingTop: 100,  // Adds space below the title without moving the title up
//   },
// });

// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import NextScreen from './components/NextScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NextScreen" component={NextScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
