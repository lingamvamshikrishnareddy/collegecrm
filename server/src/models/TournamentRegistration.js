// models/TournamentRegistration.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TournamentRegistration = sequelize.define('TournamentRegistration', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    tournamentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'tournaments', key: 'id' }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    teamName: {
      type: DataTypes.STRING
    },
    teamMembers: {
      type: DataTypes.JSON   // [{ userId, inGameName }]
    },
    inGameName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('registered', 'confirmed', 'eliminated', 'winner'),
      defaultValue: 'registered'
    },
    placement: {
      type: DataTypes.INTEGER   // final rank
    },
    pointsEarned: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'tournament_registrations',
    timestamps: true,
    indexes: [
      { fields: ['tournamentId'] },
      { fields: ['userId'] },
      { unique: true, fields: ['tournamentId', 'userId'] }
    ]
  });

  TournamentRegistration.associate = (models) => {
    TournamentRegistration.belongsTo(models.Tournament, { foreignKey: 'tournamentId', as: 'tournament' });
    TournamentRegistration.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return TournamentRegistration;
};
