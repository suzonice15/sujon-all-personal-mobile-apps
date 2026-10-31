import axios from 'axios';
import {api_url} from '../config/url';

// 🔥 Base Axios instance
const client = axios.create({
  baseURL: api_url,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});


// ================================
// 📩 RESPONSE INTERCEPTOR
// ================================
client.interceptors.response.use(
  (response) => {
    // 👉 শুধু data return করবে
    return response.data;
  },
  (error) => {
    console.log(
      'API ERROR:',
      error?.response?.data || error.message
    );
    return Promise.reject(error);
  }
);


// ================================
// 🚀 SIMPLE API WRAPPER
// ================================
export const api = {
  get: (url, config = {}) => client.get(url, config),

  post: (url, data = {}, config = {}) =>
    client.post(url, data, config),

  put: (url, data = {}, config = {}) =>
    client.put(url, data, config),

  delete: (url, config = {}) =>
    client.delete(url, config),
};

export default client;