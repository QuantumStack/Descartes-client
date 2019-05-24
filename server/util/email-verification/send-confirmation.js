
const { User, EmailVerificationToken } = require('./../../models');
const transporter = require('./../email/transporter');

const tokenGenerator = require('./generate-token');

const config = require('./../../config');

module.exports = user => EmailVerificationToken.findOne({
  where: {
    UserId: user.id,
  },
  order: [['createdAt', 'DESC']],
}).then((t) => {
  if (t && Date.now() - t.createdAt < config.EMAIL_VERIFICATION_DELAY) {
    const error = new Error('You have already requested an email verification recently.');
    error.name = 'email-verification-too-quickly';

    return error;
  }

  // TODO: Implement email-sending behavior
  tokenGenerator(user).then((t) => {
    const message = {
      from: `Descartes <${config.SMTP_USER}>`,
      to: user.email,
      subject: 'Verify your Descartes account!',
      html: `
        Have fun, here is your code ${t}
      `,
    };

    transporter.sendMail(message);
  });
});
