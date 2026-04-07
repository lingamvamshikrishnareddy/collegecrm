// services/api/gaming.js — matches backend /api/v1/gaming
import api from './index';

export const gamingApi = {
  // Tournaments
  listTournaments: (params = {}) => api.get('/gaming/tournaments', { params }),
  getTournament: (id) => api.get(`/gaming/tournaments/${id}`),
  createTournament: (data) => api.post('/gaming/tournaments', data),
  updateTournament: (id, data) => api.put(`/gaming/tournaments/${id}`, data),
  // Register: { teamName, members[] }
  register: (id, data) => api.post(`/gaming/tournaments/${id}/register`, data),

  // Gaming profile
  getProfile: (userId) => api.get(`/gaming/profile${userId ? `/${userId}` : ''}`),
  // data: { games[], rank, playtime, preferredModes[] }
  saveProfile: (data) => api.put('/gaming/profile', data),
};
