
const { EMAIL_VERIFICATION_EXPIRY } = require('./../config');

module.exports = (sequelize, DataTypes) => {
  const EmailVerificationToken = sequelize.define('EmailVerificationToken', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  /**
   * As soon as the server is spawned, we need to create timers to clear out
   * old tokens. This will calculate the time left for each token, then it will
   * delete those tokens from the database as soon as they are expired.
   */
  EmailVerificationToken.findAll({}).then((ts) => {
    // For each token, we need to map a deletion function to it.
    ts.map((t) => {
      // Calculate the time left and set a timer.
      setTimeout(() => {
        EmailVerificationToken.destroy({
          where: {
            token: t.token,
            UserId: t.UserId,
          },
        });
      }, t.createdAt - Date.now() + EMAIL_VERIFICATION_EXPIRY);
    });
  });

  /**
   * After a token is saved, we need to create a timer so that it will be
   * deleted upon expiry.
   */
  EmailVerificationToken.afterSave(t => setTimeout(() => EmailVerificationToken.destroy({
    where: {
      token: t.token,
      UserId: t.UserId,
    },
  }), EMAIL_VERIFICATION_EXPIRY));

  /**
   * Create associations.
   */
  EmailVerificationToken.associate = (models) => {
    EmailVerificationToken.belongsTo(models.User);
  };
  return EmailVerificationToken;
};
