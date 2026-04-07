// models/Tournament.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Tournament = sequelize.define('Tournament', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    game: {
      type: DataTypes.STRING,
      allowNull: false   // "BGMI", "Valorant", "FIFA 25", "Chess"
    },
    gameIcon: {
      type: DataTypes.STRING  // emoji or icon name
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false   // "Squad (4v4)", "1v1", "Team (5v5)"
    },
    organizer: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    prizePool: {
      type: DataTypes.STRING   // "₹5,000" — flexible
    },
    prizeAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    totalSlots: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    filledSlots: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY
    },
    status: {
      type: DataTypes.ENUM('upcoming', 'registering', 'in-progress', 'completed', 'cancelled'),
      defaultValue: 'upcoming'
    },
    bracketData: {
      type: DataTypes.JSON   // tournament bracket structure
    },
    rules: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'tournaments',
    timestamps: true,
    indexes: [
      { fields: ['game'] },
      { fields: ['status'] },
      { fields: ['startDate'] }
    ]
  });

  Tournament.associate = (models) => {
    Tournament.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
    Tournament.hasMany(models.TournamentRegistration, { foreignKey: 'tournamentId', as: 'registrations' });
  };

  return Tournament;
};
