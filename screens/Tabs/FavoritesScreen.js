import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const FavoritesScreen = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem('favorites');
                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                }
            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        };

        loadFavorites();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
        >
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <View style={styles.cardContent}>
                <Text style={styles.recipeTitle}>{item.title}</Text>
                <Text style={styles.recipeDescription}>Tap to view recipe details</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <LinearGradient colors={['#4E1818', '#AE3838']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Favorites</Text>
            </View>
            {favorites.length === 0 ? (
                <Text style={styles.noFavorites}>No favorite recipes found!</Text>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'transparent', // To make sure the gradient is visible
    },
    header: {
        marginTop: 40,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5, // Android shadow effect
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#4E1818',
        textAlign: 'center',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
        padding: 15,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5, // Android shadow effect
        alignItems: 'center',
    },
    recipeImage: {
        width: 90,
        height: 90,
        borderRadius: 12,
    },
    cardContent: {
        marginLeft: 15,
        flex: 1,
    },
    recipeTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    recipeDescription: {
        fontSize: 14,
        color: '#777',
    },
    listContent: {
        paddingBottom: 20,
    },
    noFavorites: {
        color: '#FFF',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
    },
});

export default FavoritesScreen;
