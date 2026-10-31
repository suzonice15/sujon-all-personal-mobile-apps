import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [userTheme, setUserTheme] = useState(null); // null = follow system

  const isDark = userTheme !== null ? userTheme : systemScheme === 'dark';

  const toggleTheme = (value) => setUserTheme(value);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
