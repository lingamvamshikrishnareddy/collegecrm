// models/GamingProfile.js — campus gaming identity & leaderboard data
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const GamingProfile = sequelize.define('GamingProfile', {
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
    displayName: {
      type: DataTypes.STRING,
      allowNull: false   // "Rohit 'Clutch' Singh"
    },
    primaryGame: {
      type: DataTypes.STRING
    },
    games: {
      type: DataTypes.JSON,
      defaultValue: []
      // [{ game, rank, kd, inGameName, role, skillLevel }]
    },
    totalPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    wins: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    losses: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    tournamentWins: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    hostel: {
      type: DataTypes.STRING
    },
    lookingForSquad: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    playtime: {
      type: DataTypes.STRING   // "Evenings 8-11pm"
    },
    micReady: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    squadPreference: {
      type: DataTypes.TEXT   // "Looking for ranked grind squad"
    },
    leaderboardRank: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'gaming_profiles',
    timestamps: true,
    indexes: [
      { fields: ['userId'] },
      { fields: ['totalPoints'] },
      { fields: ['leaderboardRank'] },
      { fields: ['lookingForSquad'] }
    ]
  });

  GamingProfile.associate = (models) => {
    GamingProfile.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return GamingProfile;
};
