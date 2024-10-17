// IngredientsContext.js
import React, { createContext, useContext, useState } from 'react';

const IngredientsContext = createContext();

export const IngredientsProvider = ({ children }) => {
    const numberOfBoxes = 10; // or any number you want
    const [ingredients, setIngredients] = useState(Array(numberOfBoxes).fill(''));

    console.log("Hi from 'IngredientsContext.js'! Ingredients: ", ingredients);

    return (
        <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
            {children}
        </IngredientsContext.Provider>
    );
};

export const useIngredients = () => useContext(IngredientsContext);
