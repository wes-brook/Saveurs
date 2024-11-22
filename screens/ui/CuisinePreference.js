import React, { createContext, useContext, useState } from 'react';

const CuisinePreferenceContext = createContext();

export const CuisinePreferenceProvider = ({ children }) => {
  const [cuisinePreference, setCuisinePreference] = useState('');

  return (
    <CuisinePreferenceContext.Provider value={{ cuisinePreference, setCuisinePreference }}>
      {children}
    </CuisinePreferenceContext.Provider>
  );
};

export const useCuisinePreference = () => useContext(CuisinePreferenceContext);
