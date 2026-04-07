// server/src/models/Placement.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Placement = sequelize.define('Placement', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'students', key: 'id' }
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    package: {
      type: DataTypes.DECIMAL(10, 2)
    },
    type: {
      type: DataTypes.ENUM('internship', 'full_time', 'part_time'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('applied', 'shortlisted', 'selected', 'rejected'),
      defaultValue: 'applied'
    },
    joinDate: {
      type: DataTypes.DATEONLY
    }
  });

  Placement.associate = (models) => {
    Placement.belongsTo(models.Student, { foreignKey: 'studentId', as: 'student' });
  };

  return Placement;
};