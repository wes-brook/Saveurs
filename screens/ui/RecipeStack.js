import React from 'react';
import { View, ScrollView, StyleSheet, Text, Animated, SafeAreaView, Dimensions, TouchableOpacity} from 'react-native';
import { useIngredients } from './IngredientsContext';

const cardHeight = 120; // Set this to match your card height
const cardPadding = 19; // Padding between cards
const { height } = Dimensions.get("window");
const midScreen = height / 4; // Calculate the middle of the screen

// Spoonacula API Key: 1ba1908c45884fc580347821b2c85942

const RecipeStack = () => {
    const { ingredients } = useIngredients();
    
    const y = new Animated.Value(0); // Animated value for scrolling

    // Render the recipe cards
    const renderCards = () => {
        return ingredients.map((ingredient, index) => {
            // Calculate input range for the current card in relation to the center of the screen
            const inputRange = [
                (index - 1) * (cardHeight + cardPadding) - midScreen,
                index * (cardHeight + cardPadding) - midScreen,
                (index + 1) * (cardHeight + cardPadding) - midScreen
            ];

            const outputRangeScale = [0.8, 1, 0.8]; // Scale effect for the middle card
            const outputRangeOpacity = [0.5, 1, 0.5]; // Adjust opacity for visibility

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
                <TouchableOpacity key={index} onPress={() => navigation.navigate('RecipeDetail', { recipeId: index + 1 })} style={{ width: '90%' }}>
                    <Animated.View key={index} style={[styles.card, { opacity, transform: [{ scale }] }]}>
                        <Text style={styles.cardText}>{ingredient}</Text>
                    </Animated.View>
                </TouchableOpacity>
            );
        });
    };

    return (
        <SafeAreaView style={styles.recipeContainer}>
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    recipeContainer: {
        width: '100%',
        flex: 1,
    },
    cardStack: {
        width: '100%',
        padding: 10,
        alignItems: 'center', // Center the cards horizontally in the scroll view
    },
    card: {
        height: cardHeight,
        borderRadius: 10,
        backgroundColor: '#D3A756', // Golden card color
        marginVertical: cardPadding / 2, // Vertical margin between cards
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        position: 'relative', // Allows stacking
        overflow: 'hidden', // Prevents overflow of the shadow
        width: '110%', // Set width for cards
    },
    cardText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default RecipeStack;
