// services/api/gigs.js — matches backend /api/v1/gigs
import api from './index';

export const gigsApi = {
  // List gigs with optional filters: { type, search, status, limit, offset }
  list: (params = {}) => api.get('/gigs', { params }),

  // Get single gig with applications
  get: (id) => api.get(`/gigs/${id}`),

  // Create a new gig
  create: (data) => api.post('/gigs', data),

  // Update your own gig
  update: (id, data) => api.put(`/gigs/${id}`, data),

  // Delete your own gig
  delete: (id) => api.delete(`/gigs/${id}`),

  // Apply to a gig with optional message
  apply: (id, message) => api.post(`/gigs/${id}/apply`, { message }),

  // Update application status (accept / complete / reject)
  updateApplication: (applicationId, data) => api.put(`/gigs/applications/${applicationId}`, data),

  // Get my posted + applied gigs
  myGigs: () => api.get('/gigs/my'),

  // Get portfolio (completed gigs + earnings + avg rating)
  portfolio: (userId) => api.get(`/gigs/portfolio${userId ? `/${userId}` : ''}`),
};
