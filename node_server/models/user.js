
const bcrypt = require('bcryptjs');

const { SALT_ROUNDS } = require('./../config');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  /**
   * Before a password is saved, we need to hash it using bcrypt.
   */
  User.beforeSave((user) => {
    if (!user.changed('password')) { return Promise.resolve(); }

    return bcrypt.genSalt(SALT_ROUNDS)
      .then(salt => bcrypt.hash(user.password, salt)
        .then((hash) => {
          user.set('password', hash);
        })
        .catch(hashErr => Promise.reject(hashErr)))
      .catch(saltErr => Promise.reject(saltErr));
  });

  /**
   * Define associations.
   */
  User.associate = (models) => {
    User.hasMany(models.Course, { as: 'studentCourses' });
    User.hasMany(models.Course, { as: 'instructorCourses' });
    User.hasMany(models.EmailVerificationToken, { as: 'emailVerificationTokens' });
  };

  return User;
};
