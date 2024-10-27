import React from 'react';
import { View, Button, Alert, StyleSheet, Text, FlatList } from 'react-native';
import { useIngredients } from './IngredientsContext';

const IngredientInput = () => {
  // Get ingredients and setIngredients from context
  const { ingredients, setIngredients } = useIngredients(); // Initialize with empty strings

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
      <Text style={styles.heading}>Your Pantry</Text>
      
      <View style={styles.ingredientBox}>
        {/* Display the list of ingredients in a grid */}
        <FlatList
          contentContainerStyle={styles.grid}
          numColumns={2}
          data={ingredients}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.item}>
                <Text style={styles.itemText}>{item}</Text>
                {/* Add a button to edit the ingredient */}
                <Button title = "" onPress={() => addIngredient(index)}/>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    margin: 5,
    width: 80,
    height: 80,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: 'center',  // Center items vertically
    alignItems: 'center',      // Center items horizontally
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
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  ingredientBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 200,
    height: 475,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: 'center', // Centers grid items horizontally within the box
  }
});


export default IngredientInput;
