import axiosInstance from './axiosInstance';

export const complaintApi = {
  getComplaints: async (params = {}) => {
    const response = await axiosInstance.get('/complaints', { params });
    return response.data;
  },
  getComplaintById: async (id) => {
    const response = await axiosInstance.get(`/complaints/${id}`);
    return response.data;
  },
  createComplaint: async (payload) => {
    const response = await axiosInstance.post('/complaints', payload);
    return response.data;
  },
  updateComplaint: async (id, payload) => {
    const response = await axiosInstance.put(`/complaints/${id}`, payload);
    return response.data;
  },
  deleteComplaint: async (id) => {
    const response = await axiosInstance.delete(`/complaints/${id}`);
    return response.data;
  },
  updateStatus: async (id, payload) => {
    const response = await axiosInstance.patch(`/complaints/${id}/status`, payload);
    return response.data;
  },
  addMessage: async (id, text) => {
    const response = await axiosInstance.post(`/complaints/${id}/messages`, { text });
    return response.data;
  },
  editMessage: async (complaintId, messageId, text) => {
    const response = await axiosInstance.put(`/complaints/${complaintId}/messages/${messageId}`, { text });
    return response.data;
  },
};
