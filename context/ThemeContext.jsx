// // context/ThemeContext.js
// import React, { createContext, useState } from 'react';

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [themeDark, setThemeDark] = useState(false); // shared value

//   return (
//     <ThemeContext.Provider value={{ themeDark, setThemeDark }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
// src/context/ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load theme preference from AsyncStorage
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('isDarkMode');
        if (storedTheme !== null) {
          setIsDarkMode(JSON.parse(storedTheme));
        }
      } catch (e) {
        console.error('Failed to load theme from storage', e);
      }
    };
    loadTheme();
  }, []); // Run only once on mount

  useEffect(() => {
    // Save theme preference to AsyncStorage whenever it changes
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
      } catch (e) {
        console.error('Failed to save theme to storage', e);
      }
    };
    saveTheme();
  }, [isDarkMode]); // Run whenever isDarkMode changes

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
