// models/Rental.js — media rental (movies & games)
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Rental = sequelize.define('Rental', {
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
    mediaId: {
      type: DataTypes.STRING,
      allowNull: false   // external catalog ID
    },
    mediaTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mediaType: {
      type: DataTypes.ENUM('movie', 'game'),
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING
    },
    platform: {
      type: DataTypes.STRING   // "Netflix", "Prime", "PC/PS5"
    },
    rentalPeriod: {
      type: DataTypes.ENUM('1-day', '1-week', '1-month'),
      allowNull: false
    },
    amountPaid: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false
    },
    startedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active', 'expired', 'refunded'),
      defaultValue: 'active'
    },
    paymentReference: {
      type: DataTypes.STRING   // Stripe payment intent ID
    }
  }, {
    tableName: 'rentals',
    timestamps: true,
    indexes: [
      { fields: ['userId'] },
      { fields: ['mediaType'] },
      { fields: ['status'] },
      { fields: ['expiresAt'] }
    ]
  });

  Rental.associate = (models) => {
    Rental.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Rental;
};
