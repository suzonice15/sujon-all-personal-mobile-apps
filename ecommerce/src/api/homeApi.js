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
  return api.get(`/search/product/${query}`);
};

export const getProductByName = (name) => {
  return api.get(`/product/${name}`);
};

// ---- Offer Page APIs ----

export const getOfferDetails = (offerName) => {
  return api.get(`/singleOffer/${offerName}`);
};

export const getOfferCategories = () => {
  return api.get('/offerAllCategoryList');
};

export const getOfferProducts = () => {
  return api.get('/offerProductFilter');
};

export const getBrandByCategory = (categoryId, page = 1) => {
  return api.get(`/brandByCategoryId/${categoryId}?page=${page}`);
};

export const getProductByBrand = (brandId, page = 1) => {
  return api.get(`/ProductFilterByBrandId/${brandId}?page=${page}`);
};

export const filterOfferByPrice = (min, max, page = 1) => {
  return api.get(`/offerProductFilterWithRangeSlider/${min}/${max}?page=${page}`);
};
