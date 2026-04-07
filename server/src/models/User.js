// server/src/models/User.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50]
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        len: [10, 15]
      }
    },
    avatar: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM('student', 'faculty', 'admin', 'alumni'),
      allowNull: false,
      defaultValue: 'student'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    lastLogin: {
      type: DataTypes.DATE
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    phoneVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other', 'prefer_not_to_say')
    },
    address: {
      type: DataTypes.TEXT
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    pincode: {
      type: DataTypes.STRING,
      validate: {
        len: [6, 6]
      }
    },
    emergencyContact: {
      type: DataTypes.JSON // {name, phone, relation}
    }
  }, {
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      }
    }
  });

  // Instance methods
  User.prototype.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  User.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };

  // Associations
  User.associate = (models) => {
    User.hasOne(models.Student, { foreignKey: 'userId', as: 'studentProfile' });
    User.hasOne(models.Admin, { foreignKey: 'userId', as: 'adminProfile' });
    User.hasMany(models.Achievement, { foreignKey: 'userId', as: 'achievements' });
    User.hasMany(models.Gig, { foreignKey: 'postedBy', as: 'postedGigs' });
    User.hasMany(models.GigApplication, { foreignKey: 'applicantId', as: 'gigApplications' });
    User.hasOne(models.SkillSwap, { foreignKey: 'userId', as: 'skillSwap' });
    User.hasOne(models.GamingProfile, { foreignKey: 'userId', as: 'gamingProfile' });
    User.hasMany(models.Rental, { foreignKey: 'userId', as: 'rentals' });
  };

  return User;
};