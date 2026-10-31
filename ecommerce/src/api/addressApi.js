import { api } from './client';

export const getDivisions = () => {
  return api.get('/getDivistion');
};

export const getDistricts = (divisionId) => {
  return api.get(`/getDistrict/${divisionId}`);
};

export const getUpazilas = (districtId) => {
  return api.get(`/getUpazila/${districtId}`);
};

export const getAllAddress = (userId) => {
  return api.get(`/getAllAddress/${userId}`);
};

export const editAddress = (userId, addressId, apiToken) => {
  const formData = new FormData();
  formData.append('api_token', apiToken);
  return api.post(`/editAddress/${userId}/${addressId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateAddress = (addressId, data) => {
  return api.post(`/updateAddress/${addressId}`, data);
};

export const addNewAddress = (data) => {
  return api.post('/addNewAddress', data);
};
