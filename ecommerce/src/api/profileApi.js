import { api } from './client';

export const getUserProfile = (userId, apiToken) => {
  const formData = new FormData();
  formData.append('api_token', apiToken);
  return api.post(`/user/profile/${userId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateUserProfile = (userId, data) => {
  return api.post(`/user/profileUpdate/${userId}`, data);
};
