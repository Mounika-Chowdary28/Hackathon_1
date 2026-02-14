import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

// Issues API
export const issuesAPI = {
  create: (formData) => {
    return axios.post(`${API_URL}/issues`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
  getAll: (params) => api.get('/issues', { params }),
  getById: (id) => api.get(`/issues/${id}`),
  getNearby: (longitude, latitude, distance) =>
    api.get(`/issues/nearby/${longitude}/${latitude}/${distance}`),
  updateStatus: (id, data) => api.put(`/issues/${id}/status`, data),
  delete: (id) => api.delete(`/issues/${id}`),
  getStats: () => api.get('/issues/admin/stats'),
};

export default api;
