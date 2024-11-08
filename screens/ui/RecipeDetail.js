import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const RecipeDetail = ({ route, navigation }) => {
    const { recipeId } = route.params;
    const [recipeDetail, setRecipeDetail] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const scrollY = new Animated.Value(0); // For parallax effect

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

    // Function to save recipe to AsyncStorage
    const saveRecipe = async () => {
        try {
            const existingRecipes = await AsyncStorage.getItem('favorites');
            const favorites = existingRecipes ? JSON.parse(existingRecipes) : [];
            // Avoid adding duplicate recipes
            if (!favorites.some(recipe => recipe.id === recipeDetail.id)) {
                favorites.push(recipeDetail);
                await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
                console.log('Recipe saved!');
            } else {
                console.log('Recipe already saved.');
            }
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    };

    if (isFetching) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF5722" />
                <Text style={styles.loadingText}>Loading Recipe...</Text>
            </View>
        );
    }

    if (!recipeDetail) {
        return <Text>No details available.</Text>;
    }

    // Parallax effect for hero image
    const headerImageStyle = {
        transform: [
            {
                translateY: scrollY.interpolate({
                    inputRange: [-150, 0],
                    outputRange: [150, 0],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };

    return (
        <Animated.ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollViewContent}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
        >
            {/* Hero Image */}
            <Animated.View style={[styles.heroImageContainer, headerImageStyle]}>
                <Image source={{ uri: recipeDetail.image }} style={styles.heroImage} />
                <LinearGradient colors={['rgba(0, 0, 0, 0.2)', 'transparent']} style={styles.gradient} />
            </Animated.View>

            {/* Recipe Title */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{recipeDetail.title}</Text>
            </View>

            {/* Ingredients */}
            <View style={styles.card}>
                <Text style={styles.subtitle}>Ingredients</Text>
                {recipeDetail.extendedIngredients.map((ingredient) => (
                    <Text key={ingredient.id} style={styles.ingredient}>{ingredient.original}</Text>
                ))}
            </View>

            {/* Instructions */}
            <View style={styles.card}>
                <Text style={styles.subtitle}>Instructions</Text>
                <Text style={styles.instructions}>{recipeDetail.instructions}</Text>
            </View>

            {/* Floating Action Button to save recipe */}
            <TouchableOpacity
                style={styles.fab}
                onPress={saveRecipe} // Call saveRecipe on press
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1D1D',
    },
    scrollViewContent: {
        paddingBottom: 100, // Add space for FAB
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1D1D1D',
    },
    loadingText: {
        marginTop: 20,
        fontSize: 18,
        color: '#FF5722',
    },
    heroImageContainer: {
        width: '100%',
        height: 300,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 15,
    },
    titleContainer: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: 'white',
        marginBottom: 8,
    },
    card: {
        backgroundColor: '#2C2C2C',
        marginHorizontal: 16,
        marginVertical: 10,
        borderRadius: 12,
        padding: 16,
        elevation: 5,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#E0E0E0',
        marginBottom: 8,
    },
    ingredient: {
        fontSize: 16,
        color: '#B3B3B3',
        marginVertical: 4,
    },
    instructions: {
        fontSize: 16,
        color: '#E0E0E0',
        lineHeight: 22,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#FF5722',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    fabText: {
        fontSize: 36,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default RecipeDetail;
