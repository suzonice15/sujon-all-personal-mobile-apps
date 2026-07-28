import { api } from './client';

export const loginUser = (phone, password) => {
  return api.post('/user/login', { phone, password });
};
