import axiosInstance from './axiosInstance';

export const departmentApi = {
  getDepartments: async () => {
    const response = await axiosInstance.get('/departments');
    return response.data;
  },
  createDepartment: async (payload) => {
    const response = await axiosInstance.post('/departments', payload);
    return response.data;
  },
  updateDepartment: async (id, payload) => {
    const response = await axiosInstance.put(`/departments/${id}`, payload);
    return response.data;
  },
  deleteDepartment: async (id) => {
    const response = await axiosInstance.delete(`/departments/${id}`);
    return response.data;
  },
};
