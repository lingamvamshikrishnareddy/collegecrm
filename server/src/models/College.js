// server/src/models/College.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const College = sequelize.define('College', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shortName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.ENUM('government', 'private', 'deemed', 'autonomous'),
      allowNull: false
    },
    affiliation: {
      type: DataTypes.STRING // University affiliation
    },
    accreditation: {
      type: DataTypes.JSON // Array of accreditations (NAAC, NBA, etc.)
    },
    establishedYear: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    website: {
      type: DataTypes.STRING
    },
    logo: {
      type: DataTypes.STRING
    },
    banner: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    vision: {
      type: DataTypes.TEXT
    },
    mission: {
      type: DataTypes.TEXT
    },
    departments: {
      type: DataTypes.JSON // Array of departments
    },
    programs: {
      type: DataTypes.JSON // Array of programs offered
    },
    facilities: {
      type: DataTypes.JSON // Array of facilities
    },
    hostelInfo: {
      type: DataTypes.JSON // Hostel details
    },
    placementStats: {
      type: DataTypes.JSON // Placement statistics
    },
    ranking: {
      type: DataTypes.JSON // Various rankings
    },
    socialLinks: {
      type: DataTypes.JSON // Social media links
    },
    settings: {
      type: DataTypes.JSON // College-specific settings
    },
    subscriptionPlan: {
      type: DataTypes.ENUM('free', 'basic', 'premium', 'enterprise'),
      defaultValue: 'free'
    },
    subscriptionExpiry: {
      type: DataTypes.DATE
    },
    totalStudents: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    totalFaculty: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5
      }
    },
    totalReviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'colleges',
    timestamps: true,
    indexes: [
      { fields: ['code'] },
      { fields: ['city'] },
      { fields: ['state'] },
      { fields: ['type'] },
      { fields: ['rating'] }
    ]
  });

  // Associations
  College.associate = (models) => {
    College.hasMany(models.Student, { foreignKey: 'collegeId', as: 'students' });
    College.hasMany(models.Admin, { foreignKey: 'collegeId', as: 'admins' });
    College.hasMany(models.Event, { foreignKey: 'collegeId', as: 'events' });
    College.hasMany(models.Club, { foreignKey: 'collegeId', as: 'clubs' });
  };

  return College;
};