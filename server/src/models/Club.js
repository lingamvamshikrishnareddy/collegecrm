// server/src/models/Club.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Club = sequelize.define('Club', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    collegeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'colleges', key: 'id' }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    category: {
      type: DataTypes.ENUM('technical', 'cultural', 'sports', 'social', 'academic'),
      allowNull: false
    },
    logo: {
      type: DataTypes.STRING
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  Club.associate = (models) => {
    Club.belongsTo(models.College, { foreignKey: 'collegeId', as: 'college' });
    Club.belongsToMany(models.Student, { through: 'StudentClubs', as: 'members' });
  };

  return Club;
};
