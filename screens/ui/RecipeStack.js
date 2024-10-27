import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Animated, SafeAreaView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useIngredients } from './IngredientsContext';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient'; // Use expo-linear-gradient
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const cardHeight = 120; 
const cardPadding = 19; 
const { height } = Dimensions.get("window");
const midScreen = height / 8; 

const RecipeStack = () => {
    const { ingredients } = useIngredients();
    const [recipes, setRecipes] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const navigation = useNavigation(); // Use useNavigation hook
    const y = new Animated.Value(0);

    const fetchRecipes = async () => {
        try {
            setIsFetching(true);
            const ingredientString = ingredients.join(',');
            const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
                params: {
                    ingredients: ingredientString,
                    number: 500,
                    apiKey: '1ba1908c45884fc580347821b2c85942',
                },
            });
            setRecipes(response.data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        } finally {
            setIsFetching(false);
        }
    };

    const renderCards = () => {
        return recipes.map((recipe, index) => {
            const inputRange = [
                (index - 1) * (cardHeight + cardPadding) - midScreen,
                index * (cardHeight + cardPadding) - midScreen,
                (index + 1) * (cardHeight + cardPadding) - midScreen
            ];

            const outputRangeScale = [0.8, 1.1, 0.8];
            const outputRangeOpacity = [0.5, 1, 0.5];

            const scale = y.interpolate({
                inputRange,
                outputRange: outputRangeScale,
                extrapolate: "clamp"
            });

            const opacity = y.interpolate({
                inputRange,
                outputRange: outputRangeOpacity,
                extrapolate: "clamp"
            });

            return (
                <TouchableOpacity key={recipe.id} onPress={() => navigation.navigate('RecipeDetail', { recipeId: recipe.id })} style={{ width: '90%' }}>
                    <Animated.View style={[styles.card, { opacity, transform: [{ scale }] }]}>
                        <Image source={{ uri: recipe.image }} style={styles.cardImage} />
                        <Text style={styles.cardText}>{recipe.title}</Text>
                    </Animated.View>
                </TouchableOpacity>
            );
        });
    };

    return (
        <SafeAreaView style={styles.recipeContainer}>
            <TouchableOpacity onPress={fetchRecipes} style={styles.fetchButton} disabled={isFetching}>
                <Text style={styles.fetchButtonText}>{isFetching ? 'Fetching...' : 'Get Recipes'}</Text>
            </TouchableOpacity>

            {recipes.length > 0 ? (
                <Animated.ScrollView
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.cardStack}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y } } }],
                        { useNativeDriver: true }
                    )}
                >
                    {renderCards()}
                </Animated.ScrollView>
            ) : (
                <Text style={styles.placeholderText}>No recipes yet. Tap 'Get Recipes' to fetch recommendations!</Text>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    recipeContainer: {
        width: '100%',
        flex: 1,
    },
    cardStack: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
    },
    card: {
        height: cardHeight,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginVertical: cardPadding / 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        position: 'relative',
        overflow: 'hidden',
        width: '110%',
        backdropFilter: 'blur(10px)',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        opacity: 0.9,
        position: 'absolute',
        top: 0,
    },
    cardText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 10,
        zIndex: 1,
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 6,
    },
    fetchButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    fetchButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.6,
    },
    placeholderText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#D0D0D0',
        marginTop: 20,
        fontStyle: 'italic',
    },
});

export default RecipeStack;
