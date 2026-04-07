// server/src/models/Event.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Event = sequelize.define('Event', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    collegeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'colleges',
        key: 'id'
      }
    },
    organizerId: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    clubId: {
      type: DataTypes.UUID,
      references: {
        model: 'clubs',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    description: {
      type: DataTypes.TEXT
    },
    eventType: {
      type: DataTypes.ENUM(
        'workshop', 'seminar', 'hackathon', 'competition', 
        'cultural', 'sports', 'technical', 'conference', 
        'placement', 'social', 'academic', 'other'
      ),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING // More specific categorization
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: false
    },
    venueType: {
      type: DataTypes.ENUM('online', 'offline', 'hybrid'),
      defaultValue: 'offline'
    },
    meetingLink: {
      type: DataTypes.STRING // For online events
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    registrationStartDate: {
      type: DataTypes.DATE
    },
    registrationEndDate: {
      type: DataTypes.DATE
    },
    maxParticipants: {
      type: DataTypes.INTEGER
    },
    currentParticipants: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    eligibleYears: {
      type: DataTypes.JSON // Array of eligible years [1, 2, 3, 4]
    },
    eligibleBranches: {
      type: DataTypes.JSON // Array of eligible branches
    },
    registrationFee: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    prizes: {
      type: DataTypes.JSON // Prize structure
    },
    rules: {
      type: DataTypes.TEXT
    },
    requirements: {
      type: DataTypes.JSON // Array of requirements
    },
    speakers: {
      type: DataTypes.JSON // Array of speaker details
    },
    sponsors: {
      type: DataTypes.JSON // Array of sponsors
    },
    agenda: {
      type: DataTypes.JSON // Event schedule/agenda
    },
    resources: {
      type: DataTypes.JSON // Links to resources, materials
    },
    images: {
      type: DataTypes.JSON // Array of image URLs
    },
    banner: {
      type: DataTypes.STRING
    },
    tags: {
      type: DataTypes.JSON // Array of tags
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    requiresApproval: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'ongoing', 'completed', 'cancelled'),
      defaultValue: 'draft'
    },
    registrationStatus: {
      type: DataTypes.ENUM('not_started', 'open', 'closed'),
      defaultValue: 'not_started'
    },
    feedback: {
      type: DataTypes.JSON // Post-event feedback summary
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5
      }
    },
    totalReviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    certificates: {
      type: DataTypes.BOOLEAN,
      defaultValue: false // Whether certificates will be provided
    },
    certificateTemplate: {
      type: DataTypes.STRING // Template for certificates
    }
  }, {
    tableName: 'events',
    timestamps: true,
    indexes: [
      { fields: ['slug'] },
      { fields: ['eventType'] },
      { fields: ['status'] },
      { fields: ['startDate'] },
      { fields: ['collegeId'] },
      { fields: ['organizerId'] }
    ],
    hooks: {
      beforeCreate: (event) => {
        if (!event.slug) {
          event.slug = event.title.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim('-') + '-' + Date.now();
        }
      }
    }
  });

  // Associations
  Event.associate = (models) => {
    Event.belongsTo(models.College, { foreignKey: 'collegeId', as: 'college' });
    Event.belongsTo(models.User, { foreignKey: 'organizerId', as: 'organizer' });
    Event.belongsTo(models.Club, { foreignKey: 'clubId', as: 'club' });
    Event.belongsToMany(models.Student, {
      through: 'EventParticipants',
      foreignKey: 'eventId',
      as: 'participants'
    });
  };

  return Event;
};