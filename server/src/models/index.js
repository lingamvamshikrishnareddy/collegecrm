// models/index.js — central model registry
const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

const User              = require('./User')(sequelize);
const Student           = require('./Student')(sequelize);
const Admin             = require('./Admin')(sequelize);
const College           = require('./College')(sequelize);
const Event             = require('./Event')(sequelize);
const Club              = require('./Club')(sequelize);
const Placement         = require('./Placement')(sequelize);
const Achievement       = require('./Achievement')(sequelize);
const Gig               = require('./Gig')(sequelize);
const GigApplication    = require('./GigApplication')(sequelize);
const SkillSwap         = require('./SkillSwap')(sequelize);
const SkillCredit       = require('./SkillCredit')(sequelize);
const Tournament        = require('./Tournament')(sequelize);
const TournamentRegistration = require('./TournamentRegistration')(sequelize);
const GamingProfile     = require('./GamingProfile')(sequelize);
const Rental            = require('./Rental')(sequelize);

const models = {
  User,
  Student,
  Admin,
  College,
  Event,
  Club,
  Placement,
  Achievement,
  Gig,
  GigApplication,
  SkillSwap,
  SkillCredit,
  Tournament,
  TournamentRegistration,
  GamingProfile,
  Rental,
  sequelize,
  Sequelize
};

// Run associations
Object.values(models).forEach(model => {
  if (model && typeof model.associate === 'function') {
    model.associate(models);
  }
});

module.exports = models;
