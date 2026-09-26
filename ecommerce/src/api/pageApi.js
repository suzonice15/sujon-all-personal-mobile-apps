import { api } from './client';

export const getPageByLink = (pageLink) => {
  return api.get(`/page/pageLink/${pageLink}`);
};
