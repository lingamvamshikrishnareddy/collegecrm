// models/SkillCredit.js — time-credit transaction ledger
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SkillCredit = sequelize.define('SkillCredit', {
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
    partnerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    swapId: {
      type: DataTypes.UUID,
      references: { model: 'skill_swaps', key: 'id' }
    },
    type: {
      type: DataTypes.ENUM('earned', 'spent'),
      allowNull: false
    },
    hours: {
      type: DataTypes.DECIMAL(4, 1),
      allowNull: false,
      validate: { min: 0.5, max: 8 }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    confirmedByBoth: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 5 }
    }
  }, {
    tableName: 'skill_credits',
    timestamps: true,
    indexes: [
      { fields: ['userId'] },
      { fields: ['partnerId'] },
      { fields: ['type'] }
    ]
  });

  SkillCredit.associate = (models) => {
    SkillCredit.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    SkillCredit.belongsTo(models.User, { foreignKey: 'partnerId', as: 'partner' });
    SkillCredit.belongsTo(models.SkillSwap, { foreignKey: 'swapId', as: 'swap' });
  };

  return SkillCredit;
};
