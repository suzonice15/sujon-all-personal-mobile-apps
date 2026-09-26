import { api } from './client';

export const placeOrder = (data) => {
  return api.post('/checkout', data);
};
