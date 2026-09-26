import { api } from './client';

export const getTransaction = (userId, page = 1) => {
  return api.get(`/getTransaction/${userId}?page=${page}`);
};
