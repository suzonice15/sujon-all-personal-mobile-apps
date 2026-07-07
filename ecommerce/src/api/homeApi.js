import { api } from './client';
import { apps_slug,quize_slug } from '../config/url';

export const getHomeData = () => {
  return api.post('/v1/mobile_app_content', {
    app_slug: apps_slug
  });
};

export const getQuizeData = () => {
  return api.post('/v1/mobile_app_quize', {
    category_slug: quize_slug,
  });
};

export const getAppInfo = () => {
  return api.post('/v1/app_info', { slug: apps_slug });
};

export const getMobileCoinRate = () => {
  return api.post('/v1/mobile_coin_rate', { slug: apps_slug });
};

export const getSliders = () => {
  return api.get('/sliders');
};

export const getHomeCategory = () => {
  return api.get('/home-category');
};

export const getHomeProduct = () => {
  return api.get('/homeProduct');
};


 