import { api } from './client';
import { apps_slug } from '../config/url';

export const getHomeData = () => {
  return api.post('/v1/mobile_app_content', {
    app_slug: 'bangla_profet',
  });
};

export const getQuizeData = () => {
  return api.post('/v1/mobile_app_quize', {
    category_slug: 'islamic-quize',
  });
};

export const getAppInfo = () => {
  return api.post('/v1/app_info', { slug: apps_slug });
};
 