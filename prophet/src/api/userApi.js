import { api } from './client';
import { apps_slug, api_url } from '../config/url';

export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${api_url}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...userData, apps: apps_slug }),
    });
    return await res.json();
  } catch (e) {
    return { success: false, message: e.message };
  }
};

export const loginUser = async (email, password, deviceId = '') => {
  try {
    const res = await fetch(`${api_url}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, apps: apps_slug, device_id: deviceId }),
    });
    return await res.json();
  } catch (e) {
    return { success: false, message: e.message };
  }
};

export const getReferralInfo = async (deviceId) => {
  return api.get('/v1/referral/info', { params: { device_id: deviceId, slug: apps_slug } });
};

export const getRefCode = async (deviceId) => {
  try {
    const res = await fetch(`${api_url}/ref_code?device_id=${encodeURIComponent(deviceId)}&slug=${encodeURIComponent(apps_slug)}`);
    return await res.json();
  } catch (e) {
    return { success: false, message: e.message };
  }
};