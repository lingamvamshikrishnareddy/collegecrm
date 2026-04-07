// server/src/config/constants.js
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  
  UPLOAD_LIMITS: {
    FILE_SIZE: 10 * 1024 * 1024, // 10MB
    FILES_COUNT: 5
  },
  
  PAGINATION: {
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100
  },
  
  POINTS: {
    TASK_COMPLETION: 10,
    LEVEL_UP_BONUS: 100,
    EVENT_PARTICIPATION: 25
  },
  
  LEVELS: {
    POINTS_PER_LEVEL: 1000
  }
};
