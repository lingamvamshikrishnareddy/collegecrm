// models/Admin.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Admin = sequelize.define('Admin', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: { model: 'users', key: 'id' }
    },
    collegeId: {
      type: DataTypes.UUID,
      references: { model: 'colleges', key: 'id' }
    },
    permissions: {
      type: DataTypes.JSON,
      defaultValue: []
    }
  }, {
    tableName: 'admins',
    timestamps: true
  });

  Admin.associate = (models) => {
    Admin.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Admin.belongsTo(models.College, { foreignKey: 'collegeId', as: 'college' });
  };

  return Admin;
};
