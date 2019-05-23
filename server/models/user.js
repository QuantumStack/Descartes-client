'use strict';

const bcrypt = require('bcryptjs');
const { saltRounds } = require('./../config');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.beforeSave((user) => {
    if (!user.changed('password')) { return Promise.resolve(); }

    return bcrypt.genSalt(saltRounds)
      .then(salt => bcrypt.hash(user.password, salt)
        .then((hash) => {
          user.password = hash;
        })
        .catch(hashErr => Promise.reject(hashErr)))
      .catch(saltErr => Promise.reject(saltErr));
  });

  User.associate = (models) => {
    User.hasMany(models.Course, { as: 'studentCourses' });
    User.hasMany(models.Course, { as: 'instructorCourses' });
  };

  return User;
};
