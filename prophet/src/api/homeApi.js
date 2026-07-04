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

export const getMobileCoinRate = () => {
  return api.post('/v1/mobile_coin_rate', { slug: apps_slug });
};

export const submitWithdrawRequest = (data) => {
  return api.post('/v1/withdraw', data);
};

export const getMyWithdraws = (data) => {
  return api.post('/v1/withdraw/my-requests', data);
};
 