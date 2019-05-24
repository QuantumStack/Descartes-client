
const { User, EmailVerificationToken } = require('./../../models');
const transporter = require('./../email/transporter');

const tokenGenerator = require('./generate-token');

const { EMAIL_VERIFICATION_DELAY } = require('./../../config');

module.exports = user => EmailVerificationToken.findOne({
  where: {
    UserId: user.id,
  },
  order: [['createdAt', 'DESC']],
}).then((t) => {
  if (t && Date.now() - t.createdAt < EMAIL_VERIFICATION_DELAY) {
    const error = new Error('You have already requested an email verification recently.');
    error.name = 'email-verification-too-quickly';

    return error;
  }

  // TODO: Implement email-sending behavior
  return null;
});
