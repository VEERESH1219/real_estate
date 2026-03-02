import axios from 'axios';

const BASE_URL = process.env.API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
);

export const landsApi = {
  getAll: () => api.get('/lands'),
  getById: (id) => api.get(`/lands/${id}`),
  create: (data) => api.post('/lands', data),
  update: (id, data) => api.put(`/lands/${id}`, data),
  delete: (id) => api.delete(`/lands/${id}`)
};

export const plotsApi = {
  getByLand: (landId) => api.get(`/plots/land/${landId}`),
  getById: (id) => api.get(`/plots/${id}`),
  create: (data) => api.post('/plots', data),
  update: (id, data) => api.put(`/plots/${id}`, data),
  delete: (id) => api.delete(`/plots/${id}`)
};

export const plot3dApi = {
  getByPlot: (plotId) => api.get(`/plot/${plotId}`),
  create: (data) => api.post('/', data),
  update: (id, data) => api.put(`/${id}`, data)
};

export default api;
