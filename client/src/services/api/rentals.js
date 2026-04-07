// services/api/rentals.js — matches backend /api/v1/rentals
import api from './index';

export const rentalsApi = {
  // List my rentals: { mediaType, status, limit, offset }
  list: (params = {}) => api.get('/rentals', { params }),

  // Get a single rental
  get: (id) => api.get(`/rentals/${id}`),

  // Rent media
  // data: { mediaId, mediaTitle, mediaType, genre, platform,
  //          rentalPeriod ('1-day'|'1-week'|'1-month'),
  //          amountPaid, paymentReference }
  create: (data) => api.post('/rentals', data),

  // Mark expired rentals (admin / cron use)
  expireAll: () => api.post('/rentals/expire'),
};
