import axiosInstance from './axiosInstance';

export const userManagementApi = {
  getUsers: async (params) => {
    const response = await axiosInstance.get('/users', { params });
    return response.data;
  },
  getUserStats: async () => {
    const response = await axiosInstance.get('/users/stats');
    return response.data;
  },
  exportUsers: async (params) => {
    const response = await axiosInstance.get('/users/export', {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
  getUserById: async (id) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },
  createUser: async (payload) => {
    const response = await axiosInstance.post('/users', payload);
    return response.data;
  },
  updateUser: async (id, payload) => {
    const response = await axiosInstance.put(`/users/${id}`, payload);
    return response.data;
  },
  activateUser: async (id) => {
    const response = await axiosInstance.patch(`/users/${id}/activate`);
    return response.data;
  },
  deactivateUser: async (id) => {
    const response = await axiosInstance.patch(`/users/${id}/deactivate`);
    return response.data;
  },
  suspendUser: async (id, payload) => {
    const response = await axiosInstance.patch(`/users/${id}/suspend`, payload);
    return response.data;
  },
  changeUserRole: async (id, role, reason) => {
    const response = await axiosInstance.patch(`/users/${id}/role`, { role, reason });
    return response.data;
  },
  assignDepartment: async (id, departmentId) => {
    const response = await axiosInstance.patch(`/users/${id}/department`, { departmentId });
    return response.data;
  },
  resetUserPassword: async (id, payload) => {
    const response = await axiosInstance.post(`/users/${id}/reset-password`, payload);
    return response.data;
  },
  getUserActivity: async (id) => {
    const response = await axiosInstance.get(`/users/${id}/activity`);
    return response.data;
  },
  getUserComplaints: async (id) => {
    const response = await axiosInstance.get(`/users/${id}/complaints`);
    return response.data;
  },
  bulkUserAction: async (payload) => {
    const response = await axiosInstance.post('/users/bulk-action', payload);
    return response.data;
  },
};
