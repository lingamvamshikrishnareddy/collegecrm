// server/src/models/Achievement.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Achievement = sequelize.define('Achievement', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    type: {
      type: DataTypes.ENUM('task_completion', 'level_up', 'course_completion', 'event_participation'),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    badge: {
      type: DataTypes.STRING
    }
  });

  Achievement.associate = (models) => {
    Achievement.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Achievement;
};
