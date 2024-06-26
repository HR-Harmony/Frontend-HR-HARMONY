import { toast } from 'react-toastify';

import axiosInstance from '@/configs/axiosInstance';

export const APIPayroll = {
  getAllPayrolls: async (params) => {
    try {
      const result = await axiosInstance.get('/payrolls', {
        params,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getPayrollHistory: async (params) => {
    try {
      const result = await axiosInstance.get('/payrolls/history', {
        params,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updatePayrollStatus: async (payrollId, paidStatus) => {
    try {
      const result = await axiosInstance.put(`/payrolls/${payrollId}`, { paid_status: paidStatus }, {
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

  createAdvanceSalary: async (advanceSalaryData) => {
    try {
      const result = await axiosInstance.post('/advance_salaries', advanceSalaryData, {
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

  getAllAdvanceSalaries: async (params) => {
    try {
      const result = await axiosInstance.get('/advance_salaries', {
        params,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getAdvanceSalaryById: async (id) => {
    try {
      const result = await axiosInstance.get(`/advance_salaries/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateAdvanceSalaryById: async (id, advanceSalaryData) => {
    try {
      const result = await axiosInstance.put(`/advance_salaries/${id}`, advanceSalaryData, {
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

  deleteAdvanceSalaryById: async (id) => {
    try {
      const result = await axiosInstance.delete(`/advance_salaries/${id}`, {
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

  createRequestLoan: async (requestLoanData) => {
    try {
      const result = await axiosInstance.post('/request_loans', requestLoanData, {
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

  getAllRequestLoans: async (params) => {
    try {
      const result = await axiosInstance.get('/request_loans', {
        params,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getRequestLoanById: async (id) => {
    try {
      const result = await axiosInstance.get(`/request_loans/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateRequestLoanById: async (id, requestLoanData) => {
    try {
      const result = await axiosInstance.put(`/request_loans/${id}`, requestLoanData, {
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

  deleteRequestLoanById: async (id) => {
    try {
      const result = await axiosInstance.delete(`/request_loans/${id}`, {
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
