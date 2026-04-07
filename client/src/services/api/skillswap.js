// services/api/skillswap.js — matches backend /api/v1/skill-swap
import api from './index';

export const skillSwapApi = {
  // List all active swaps: { category, search, mode, limit, offset }
  list: (params = {}) => api.get('/skill-swap', { params }),

  // Get a single swap listing
  get: (id) => api.get(`/skill-swap/${id}`),

  // Create your swap offer
  // data: { offering, wants, category, availability, mode }
  create: (data) => api.post('/skill-swap', data),

  // Update your swap listing
  update: (id, data) => api.put(`/skill-swap/${id}`, data),

  // Delete your swap listing
  delete: (id) => api.delete(`/skill-swap/${id}`),

  // Get your own swap listings
  mySwaps: () => api.get('/skill-swap/my'),
};
