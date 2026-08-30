import axiosInstance from './axiosInstance';

export const companyApi = {
  registerCompany: async (payload) => {
    const response = await axiosInstance.post('/companies/register', payload);
    return response.data;
  },
  getByCode: async (code) => {
    const response = await axiosInstance.get(`/companies/code/${code}`);
    return response.data;
  },
};
