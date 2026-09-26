import { api } from './client';

export const submitReview = (productId, data) => {
  return api.post(`/reviewSubmit/${productId}`, data);
};

export const getReview = (userId, page = 1) => {
  return api.get(`/getReview/${userId}?page=${page}`);
};
