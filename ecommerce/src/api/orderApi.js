import { api } from './client';

export const getOrderByUserId = (userId, orderStatus, page = 1) => {
  return api.get(`/getOrderByUserId/${userId}/${orderStatus}?page=${page}`);
};

export const searchByOrderId = (userId, searchValue, page = 1) => {
  return api.get(`/searchByOrderId/${userId}/${searchValue}?page=${page}`);
};

export const searchOrderByOrderStatus = (userId, orderStatus, page = 1) => {
  return api.get(`/searchOrderByOrderStatus/${userId}/${orderStatus}?page=${page}`);
};

export const totalOrderStatus = (userId) => {
  return api.get(`/totalOrderStatus/${userId}`);
};

export const getOrderMeta = (orderId) => {
  return api.get(`/getOrderMeta/${orderId}`);
};

export const getOrderData = (orderId) => {
  return api.get(`/getOrderData/${orderId}`);
};

export const getTimeline = (orderId) => {
  return api.get(`/getTimeline/${orderId}`);
};

export const cancelOrder = (userId, orderId, apiToken) => {
  const formData = new FormData();
  formData.append('api_token', apiToken);
  return api.post(`/orderCancel/${userId}/${orderId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
