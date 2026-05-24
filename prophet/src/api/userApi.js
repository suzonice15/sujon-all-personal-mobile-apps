import { apiPublic } from './client';

// 🏠 Home screen data
export const getUserData = () => {
  return apiPublic.get('/home');
};
 