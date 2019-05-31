const crypto = require('crypto-random-string');

const { EmailVerificationToken } = require('./../../models');

module.exports = (user) => {
  const t = crypto({ length: 64, type: 'url-safe' });

  return EmailVerificationToken.create({
    token: t,
  })
    .then((verificationToken) => {
      verificationToken.setUser(user);
      return verificationToken.token;
    });
};
