import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../api/authApi';

const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const stored = await AsyncStorage.getItem('auth');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed.user);
        setToken(parsed.token);
      }
    } catch {} finally {
      setLoading(false);
    }
  };

  const saveAuth = async (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    await AsyncStorage.setItem('auth', JSON.stringify({ user: userData, token: authToken }));
  };

  const decodeToken = (token) => {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return {
        id: decoded.id,
        name: decoded.name?.trim(),
        phone: decoded.phone,
        picture: decoded.picture,
      };
    } catch {
      return null;
    }
  };

  const login = useCallback(async (phone, password) => {
    const res = await loginUser(phone, password);
    const authToken = res?.api_token;
    if (!authToken) throw new Error('Login failed');
    const userData = decodeToken(authToken) || { name: 'User', phone };
    await saveAuth(userData, authToken);
    return userData;
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('auth');
  }, []);

  const updateUser = useCallback(async (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    if (token) {
      await AsyncStorage.setItem('auth', JSON.stringify({ user: updated, token }));
    }
  }, [user, token]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
