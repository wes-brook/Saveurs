// RecipeDetail.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';

const RecipeDetail = ({ route }) => {
    const { recipeId } = route.params; // Get the recipe ID from navigation
    const [recipeDetail, setRecipeDetail] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchRecipeDetail = async () => {
            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
                    params: {
                        apiKey: '1ba1908c45884fc580347821b2c85942',
                    },
                });
                setRecipeDetail(response.data);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchRecipeDetail();
    }, [recipeId]);

    if (isFetching) {
        return <Text>Loading...</Text>;
    }

    if (!recipeDetail) {
        return <Text>No details available.</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: recipeDetail.image }} style={styles.image} />
            <Text style={styles.title}>{recipeDetail.title}</Text>
            <Text style={styles.subtitle}>Ingredients:</Text>
            <View>
                {recipeDetail.extendedIngredients.map((ingredient) => (
                    <Text key={ingredient.id} style={styles.ingredient}>{ingredient.original}</Text>
                ))}
            </View>
            <Text style={styles.subtitle}>Instructions:</Text>
            <Text style={styles.instructions}>{recipeDetail.instructions}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
        color: 'white',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
        color: 'white',
    },
    ingredient: {
        fontSize: 16,
        marginVertical: 2,
        color: 'white',
    },
    instructions: {
        fontSize: 16,
        marginVertical: 10,
        color: 'white',
    },
});

export default RecipeDetail;
