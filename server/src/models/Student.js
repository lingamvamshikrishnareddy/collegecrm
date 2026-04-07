// server/src/models/Student.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Student = sequelize.define('Student', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    collegeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'colleges',
        key: 'id'
      }
    },
    rollNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    admissionNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    batch: {
      type: DataTypes.STRING,
      allowNull: false // e.g., "2021-2025"
    },
    currentYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 6
      }
    },
    currentSemester: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 12
      }
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: false // CSE, ECE, MECH, etc.
    },
    section: {
      type: DataTypes.STRING
    },
    admissionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    graduationDate: {
      type: DataTypes.DATEONLY
    },
    cgpa: {
      type: DataTypes.DECIMAL(3, 2),
      validate: {
        min: 0,
        max: 10
      }
    },
    totalCredits: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isHosteller: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    hostelBlock: {
      type: DataTypes.STRING
    },
    roomNumber: {
      type: DataTypes.STRING
    },
    parentDetails: {
      type: DataTypes.JSON // {father: {name, phone, occupation}, mother: {name, phone, occupation}}
    },
    academicStatus: {
      type: DataTypes.ENUM('active', 'detained', 'suspended', 'graduated', 'dropped'),
      defaultValue: 'active'
    },
    placementStatus: {
      type: DataTypes.ENUM('not_eligible', 'eligible', 'placed', 'higher_studies', 'entrepreneur'),
      defaultValue: 'not_eligible'
    },
    skills: {
      type: DataTypes.JSON // Array of skills
    },
    interests: {
      type: DataTypes.JSON // Array of interests
    },
    socialLinks: {
      type: DataTypes.JSON // {linkedin, github, portfolio, etc.}
    },
    resumeUrl: {
      type: DataTypes.STRING
    },
    // Life Skills Tracking
    lifeSkillsScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    completedTasks: {
      type: DataTypes.JSON, // Array of completed task IDs
      defaultValue: []
    },
    // Gamification
    totalPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    badges: {
      type: DataTypes.JSON, // Array of badge IDs
      defaultValue: []
    }
  }, {
    tableName: 'students',
    timestamps: true,
    indexes: [
      { fields: ['rollNumber'] },
      { fields: ['batch'] },
      { fields: ['branch'] },
      { fields: ['currentYear'] },
      { fields: ['cgpa'] }
    ]
  });

  // Associations
  Student.associate = (models) => {
    Student.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Student.belongsTo(models.College, { foreignKey: 'collegeId', as: 'college' });
    Student.belongsToMany(models.Club, {
      through: 'StudentClubs',
      foreignKey: 'studentId',
      as: 'clubs'
    });
    Student.belongsToMany(models.Event, {
      through: 'EventParticipants',
      foreignKey: 'studentId',
      as: 'events'
    });
    Student.hasMany(models.Placement, { foreignKey: 'studentId', as: 'placements' });
  };

  return Student;
};