import { api } from './client';

export const loginUser = (email, password) => {
  return api.post('/login', { email, password });
};

export const registerUser = (data) => {
  return api.post('/register', data);
};

export const googleLogin = (idToken) => {
  return api.post('/auth/google', { id_token: idToken });
};

export const getUserProfile = () => {
  return api.get('/user/profile');
};

export const updateUserProfile = (data) => {
  return api.put('/user/profile', data);
};
