import axiosInstance from './axiosInstance';

export const joinRequestApi = {
  submitRequest: async (payload) => {
    const response = await axiosInstance.post('/join-requests', payload);
    return response.data;
  },
  getMyRequest: async () => {
    const response = await axiosInstance.get('/join-requests/my');
    return response.data;
  },
  getAdminRequests: async (statusFilter = 'ALL') => {
    const params = statusFilter && statusFilter !== 'ALL' ? { status: statusFilter } : {};
    const response = await axiosInstance.get('/join-requests/admin', { params });
    return response.data;
  },
  approveRequest: async (id, role, departmentId) => {
    const response = await axiosInstance.patch(`/join-requests/admin/${id}/approve`, {
      role,
      departmentId,
    });
    return response.data;
  },
  rejectRequest: async (id, rejectionReason) => {
    const response = await axiosInstance.patch(`/join-requests/admin/${id}/reject`, {
      rejectionReason,
    });
    return response.data;
  },
};
