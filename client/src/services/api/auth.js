import api from './index';

// Auth API service
export const authService = {
  // Validate token and get current user profile
  async getProfile() {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Login user
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Register user
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Logout user
  async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  }
};

export default authService;
