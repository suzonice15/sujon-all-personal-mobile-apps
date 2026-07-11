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

export const getReferralHistory = async (deviceId) => {
  return api.post('/v1/referral/history', { device_id: deviceId, slug: apps_slug });
};

export const updateProfile = async (data) => {
  try {
    const res = await fetch(`${api_url}/user/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (e) {
    return { success: false, message: e.message };
  }
};

export const forgotPassword = async (email) => {
  try {
    const res = await fetch(`${api_url}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, apps: apps_slug }),
    });
    return await res.json();
  } catch (e) {
    return { success: false, message: e.message };
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const res = await fetch(`${api_url}/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, apps: apps_slug }),
    });
    return await res.json();
  } catch (e) {
    return { success: false, message: e.message };
  }
};

export const resetPassword = async (email, otp, password, deviceId) => {
  try {
    const res = await fetch(`${api_url}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, password, device_id: deviceId, apps: apps_slug }),
    });
    return await res.json();
  } catch (e) {
    return { success: false, message: e.message };
  }
};

export const getRefCode = async (deviceId) => {
  try {
    const res = await fetch(`${api_url}/ref_code?device_id=${encodeURIComponent(deviceId)}&slug=${encodeURIComponent(apps_slug)}`);
    return await res.json();
  } catch (e) {
    return { success: false, message: e.message };
  }
};

export const getLeaderboard = async () => {
  return api.post('/v1/referral/leaderboard', { slug: apps_slug });
};

export const getReferralCommissions = async (deviceId) => {
  return api.post('/v1/referral/commissions', { device_id: deviceId, slug: apps_slug });
};

export const markCommissionsMoved = async (deviceId, records) => {
  return api.post('/v1/referral/mark-commissions-moved', { device_id: deviceId, slug: apps_slug, records });
};