import axiosInstance from './axiosInstance';

export const authApi = {
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  },
  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  },
  getMe: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },
  refresh: async () => {
    const response = await axiosInstance.post('/auth/refresh');
    return response.data;
  },
};
