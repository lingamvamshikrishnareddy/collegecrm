// models/GigApplication.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const GigApplication = sequelize.define('GigApplication', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    gigId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'gigs', key: 'id' }
    },
    applicantId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    message: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'completed'),
      defaultValue: 'pending'
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 5 }
    },
    review: {
      type: DataTypes.TEXT
    },
    completedAt: {
      type: DataTypes.DATE
    }
  }, {
    tableName: 'gig_applications',
    timestamps: true,
    indexes: [
      { fields: ['gigId'] },
      { fields: ['applicantId'] },
      { fields: ['status'] },
      { unique: true, fields: ['gigId', 'applicantId'] }
    ]
  });

  GigApplication.associate = (models) => {
    GigApplication.belongsTo(models.Gig, { foreignKey: 'gigId', as: 'gig' });
    GigApplication.belongsTo(models.User, { foreignKey: 'applicantId', as: 'applicant' });
  };

  return GigApplication;
};
