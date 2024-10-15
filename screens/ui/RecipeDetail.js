// RecipeDetail.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecipeDetail = ({ route }) => {
    const { recipeId } = route.params; // Get the recipe ID passed from RecipeStack

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recipe {recipeId}</Text>
            <Text style={styles.details}>Details about Recipe {recipeId} will go here.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 16,
        marginTop: 10,
    },
});

export default RecipeDetail;
