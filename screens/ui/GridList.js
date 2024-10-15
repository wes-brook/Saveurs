import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet, Text, FlatList } from 'react-native';

const IngredientInput = () => {
  // Define a fixed number of ingredient boxes
  const numberOfBoxes = 12; // You can change this to whatever number you need
  const [ingredients, setIngredients] = useState(Array(numberOfBoxes).fill('')); // Initialize with empty strings

  // Function to handle adding a new ingredient at a specific index
  const addIngredient = (index) => {
    Alert.prompt(
      "Enter Ingredient",
      "Type the name of the ingredient",
      (text) => {
        if (text) {
          // Create a copy of the ingredients array
          const newIngredients = [...ingredients];
          // Assign the new ingredient to the specified index
          newIngredients[index] = text;
          setIngredients(newIngredients); // Update state with new ingredients
        }
      }
    );
  };

  return (
    <View style={{ padding: 6 }}>
      <Text style={styles.heading}>Ingredients</Text>

      {/* Display the list of ingredients in a grid */}
      <FlatList
        contentContainerStyle={styles.grid}
        numColumns={2}
        data={ingredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item || 'Empty'}</Text>
              {/* Add a button to edit the ingredient */}
              <Button title="+" onPress={() => addIngredient(index)} color="white" />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    opacity: 50,
    margin: 5,
    width: 80,
    padding: 8,
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    shadowColor: '#000', // Shadow color 
    shadowOffset: { width: 0, height: 2 }, // Shadow offset 
    shadowOpacity: 0.3, // Shadow opacity 
    shadowRadius: 4, // Shadow radius
  },
  itemText: {
    color: 'white',
    textAlign: 'center',
  },
  grid: {
    marginBottom: 32,
    marginTop: 16,
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  }
});

export default IngredientInput;
