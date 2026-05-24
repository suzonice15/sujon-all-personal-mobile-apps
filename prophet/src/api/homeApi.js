import { api } from './client';

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
 