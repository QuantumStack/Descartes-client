
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  Course.associate = (models) => {
    Course.belongsToMany(models.User, {
      as: 'instructors',
      through: 'UserCourse',
    });
    Course.belongsToMany(models.User, {
      as: 'students',
      through: 'UserCourse',
    });
  };

  return Course;
};
