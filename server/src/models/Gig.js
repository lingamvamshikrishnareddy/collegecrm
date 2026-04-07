// models/Gig.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Gig = sequelize.define('Gig', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    postedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5, 150] }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('2-hour-gig', 'freelance', 'volunteering', 'campus-work'),
      allowNull: false
    },
    pay: {
      type: DataTypes.STRING,
      allowNull: false  // flexible: "₹300", "Certificate + Food", etc.
    },
    payAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0   // numeric value for sorting/filtering
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false  // "2 hrs", "1 day", "Flexible"
    },
    skills: {
      type: DataTypes.JSON,
      defaultValue: []  // ["Design", "Canva"]
    },
    deadline: {
      type: DataTypes.DATEONLY
    },
    contactInfo: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('open', 'in-progress', 'completed', 'cancelled'),
      defaultValue: 'open'
    },
    applicantsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isUrgent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'gigs',
    timestamps: true,
    indexes: [
      { fields: ['postedBy'] },
      { fields: ['type'] },
      { fields: ['status'] },
      { fields: ['deadline'] }
    ]
  });

  Gig.associate = (models) => {
    Gig.belongsTo(models.User, { foreignKey: 'postedBy', as: 'poster' });
    Gig.hasMany(models.GigApplication, { foreignKey: 'gigId', as: 'applications' });
  };

  return Gig;
};
