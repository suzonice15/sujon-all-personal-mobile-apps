import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, googleLogin } from '../api/authApi';

const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  login: () => {},
  loginWithGoogle: () => {},
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

  const login = useCallback(async (email, password) => {
    const res = await loginUser(email, password);
    const userData = res?.user || res?.data?.user || { id: 1, name: email.split('@')[0], email };
    const authToken = res?.token || res?.data?.token || 'token_' + Date.now();
    await saveAuth(userData, authToken);
    return userData;
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const res = await googleLogin('mock_id_token');
    const userData = res?.user || res?.data?.user || { id: 2, name: 'Google User', email: 'user@gmail.com' };
    const authToken = res?.token || res?.data?.token || 'google_token_' + Date.now();
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
    <AuthContext.Provider value={{ user, token, loading, login, loginWithGoogle, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
