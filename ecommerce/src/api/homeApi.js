import { api } from './client';
  
 

export const getSliders = () => {
  return api.get('/sliders');
};

export const getHomeCategory = () => {
  return api.get('/home-category');
};

export const getHomeProduct = () => {
  return api.get('/homeProduct');
};

export const getCategoryProducts = (slug) => {
  return api.get(`/new_category/${slug}`);
};

export const searchProducts = (query) => {
  return api.get(`/search/${query}`);
};

export const getProductByName = (name) => {
  return api.get(`/product/${name}`);
};


 