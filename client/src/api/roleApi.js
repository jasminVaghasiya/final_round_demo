import axiosInstance from './axiosInstance';

export const roleApi = {
  getRoles: async () => {
    const response = await axiosInstance.get('/roles');
    return response.data;
  },

  createRole: async (roleData) => {
    const response = await axiosInstance.post('/roles', roleData);
    return response.data;
  },

  updateRole: async (id, roleData) => {
    const response = await axiosInstance.put(`/roles/${id}`, roleData);
    return response.data;
  },

  deleteRole: async (id) => {
    const response = await axiosInstance.delete(`/roles/${id}`);
    return response.data;
  },

  getDynamicPolicies: async () => {
    const response = await axiosInstance.get('/roles/policies');
    return response.data;
  },

  createDynamicPolicy: async (policyData) => {
    const response = await axiosInstance.post('/roles/policies', policyData);
    return response.data;
  },

  togglePolicyPermission: async (payload) => {
    const response = await axiosInstance.post('/roles/policies/toggle', payload);
    return response.data;
  },

  deleteDynamicPolicy: async (id) => {
    const response = await axiosInstance.delete(`/roles/policies/${id}`);
    return response.data;
  },
};
