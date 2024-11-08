import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ImageBackground, Modal, TextInput, Button } from 'react-native';
import { useIngredients } from './IngredientsContext';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

const IngredientInput = () => {
  const { ingredients, setIngredients } = useIngredients();
  const [ingredientImages, setIngredientImages] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [inputText, setInputText] = useState('');

  const fetchIngredientImage = async (ingredient) => {
    try {
      const query = `${ingredient} ingredient`;
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=AOeilR9DRunrKEtUdUTiAhd82WbYI8CHBjEdBw735OU&per_page=1`
      );
      const imageUrl = response.data.results[0]?.urls?.small || '';
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
      return '';
    }
  };

  const addIngredient = (index) => {
    setCurrentIndex(index);
    setInputText(ingredients[index] || '');
    setIsModalVisible(true);
  };

  const handleSaveIngredient = async () => {
    const newIngredients = [...ingredients];
    newIngredients[currentIndex] = inputText;
    setIngredients(newIngredients);

    const imageUrl = await fetchIngredientImage(inputText);
    setIngredientImages((prev) => ({ ...prev, [currentIndex]: imageUrl }));

    setIsModalVisible(false);
    setInputText('');
  };

  return (
    <View style={{ padding: 6 }}>
      <Text style={styles.heading}>Your Pantry</Text>

      <View style={styles.ingredientBox}>
        <FlatList
          contentContainerStyle={styles.grid}
          numColumns={2}
          data={ingredients}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ImageBackground
              source={{ uri: ingredientImages[index] }}
              style={styles.item}
              imageStyle={styles.imageBackground}
            >
              <Text style={styles.itemText}>{item || "Add"}</Text>
              <TouchableOpacity onPress={() => addIngredient(index)} style={styles.iconButton}>
                <MaterialIcons name="edit" size={20} color="white" />
              </TouchableOpacity>
            </ImageBackground>
          )}
          scrollEnabled={false}
        />
      </View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Ingredient</Text>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type the ingredient name"
              autoFocus={true} // Automatically focus input
            />
            <Button title="Save" onPress={handleSaveIngredient} />
            <Button title="Cancel" color="gray" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    borderRadius: 10,
  },
  itemText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 10,
  },
  iconButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 3,
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
    marginBottom: 15,
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
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
});

export default IngredientInput;
