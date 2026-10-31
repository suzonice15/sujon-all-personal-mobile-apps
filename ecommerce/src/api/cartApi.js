import { api } from './client';

export const getCart = () => {
  return api.get('/allCart');
};

export const addToCart = (productId, qty = 1) => {
  return api.get(`/addCart/${productId}/${qty}`);
};

export const incrementCartItem = (cartId) => {
  return api.get(`/incrementCart/${cartId}`);
};

export const decrementCartItem = (cartId) => {
  return api.get(`/decrementCart/${cartId}`);
};

export const removeCartItem = (cartId) => {
  return api.get(`/removeItem/${cartId}`);
};
