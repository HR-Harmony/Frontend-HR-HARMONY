import { toast } from 'react-toastify';
import axiosInstance from '@/configs/axiosInstance';

export const APILeaveRequest = {
  createLeaveRequestType: async (leaveRequestTypeData) => {
    try {
      const result = await axiosInstance.post('/leave_request_types', leaveRequestTypeData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success(result.data.message);
      return result.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  getAllLeaveRequestTypes: async (params) => {
    try {
      const result = await axiosInstance.get('/leave_request_types', {
        params,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getAllLeaveRequestTypesNonPagination: async () => {
    try {
      const result = await axiosInstance.get('/leave_request_types');
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getLeaveRequestTypeById: async (id) => {
    try {
      const result = await axiosInstance.get(`/leave_request_types/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateLeaveRequestTypeById: async (id, leaveRequestTypeData) => {
    try {
      const result = await axiosInstance.put(`/leave_request_types/${id}`, leaveRequestTypeData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success(result.data.message);
      return result.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  deleteLeaveRequestTypeById: async (id) => {
    try {
      const result = await axiosInstance.delete(`/leave_request_types/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success(result.data.message);
      return result.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  createLeaveRequest: async (leaveRequestData) => {
    try {
      const result = await axiosInstance.post('/leave_requests', leaveRequestData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success(result.data.message);
      return result.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  getAllLeaveRequests: async (params) => {
    try {
      const result = await axiosInstance.get('/leave_requests', {
        params,
      });
      return result.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  getLeaveRequestById: async (id) => {
    try {
      const result = await axiosInstance.get(`/leave_requests/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateLeaveRequestById: async (id, leaveRequestData) => {
    try {
      const result = await axiosInstance.put(`/leave_requests/${id}`, leaveRequestData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success(result.data.message);
      return result.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  deleteLeaveRequestById: async (id) => {
    try {
      const result = await axiosInstance.delete(`/leave_requests/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success(result.data.message);
      return result.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  }
};

