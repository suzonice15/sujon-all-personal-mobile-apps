import { api } from './client';

export const loginUser = (phone, password) => {
  return api.post('/user/login', { phone, password });
};

export const sendOtp = (phone) => {
  return api.post('/user/registration', { phone });
};

export const registerUser = (data) => {
  return api.post('/user/successRegistration', data);
};

export const forgotPassword = (phone) => {
  return api.post('/user/forgate-password', { phone });
};

export const resetPassword = (phone, password) => {
  return api.post('/user/forgatePasswordChanged', { phone, password });
};
