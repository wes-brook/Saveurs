import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';

const RecipeStack = () => {
    return (
        <View style={styles.recipeContainer}>
            <ScrollView vertical style={styles.cardStack}>
                {Array.from({ length: 18 }).map((_, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardText}>Recipe {index + 1}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    recipeContainer: {
        width: '100%',  // Make sure the container takes the full width
        flex: 1,
        
    },
    cardStack: {
        width: '100%',  // Make the ScrollView take the full width
        padding: 10,
    },
    card: {
        height: 70, 
        width: 140,
        borderRadius: 10,
        backgroundColor: '#D3A756', // Golden card color
        marginHorizontal: 10, // Horizontal margin between cards
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000', // Shadow color 
        shadowOffset: { width: 0, height: 2 }, // Shadow offset 
        shadowOpacity: 0.3, // Shadow opacity 
        shadowRadius: 4, // Shadow radius
    },
    cardText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default RecipeStack;
