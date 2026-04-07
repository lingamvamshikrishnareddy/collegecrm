// server/src/utils/helpers.js
const crypto = require('crypto');

class Helpers {
  static generateSlug(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim('-') + '-' + Date.now();
  }

  static generateRandomString(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

  static calculateLevel(points) {
    return Math.floor(points / 1000) + 1;
  }

  static formatResponse(success, message, data = null, meta = null) {
    return {
      success,
      message,
      ...(data && { data }),
      ...(meta && { meta })
    };
  }

  static paginate(page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    return { limit: parseInt(limit), offset };
  }
}

module.exports = Helpers;