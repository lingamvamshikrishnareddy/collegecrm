// models/SkillSwap.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SkillSwap = sequelize.define('SkillSwap', {
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
    offering: {
      type: DataTypes.STRING,
      allowNull: false   // "Python / Web Dev"
    },
    wants: {
      type: DataTypes.STRING,
      allowNull: false   // "Guitar lessons"
    },
    category: {
      type: DataTypes.ENUM('tech', 'arts', 'music', 'academics', 'fitness', 'language', 'other'),
      allowNull: false
    },
    availability: {
      type: DataTypes.STRING  // "Evenings", "Weekends"
    },
    mode: {
      type: DataTypes.ENUM('in-person', 'online', 'both'),
      defaultValue: 'both'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    totalSwaps: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    avgRating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0
    }
  }, {
    tableName: 'skill_swaps',
    timestamps: true,
    indexes: [
      { fields: ['userId'] },
      { fields: ['category'] },
      { fields: ['isActive'] }
    ]
  });

  SkillSwap.associate = (models) => {
    SkillSwap.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    SkillSwap.hasMany(models.SkillCredit, { foreignKey: 'swapId', as: 'credits' });
  };

  return SkillSwap;
};
