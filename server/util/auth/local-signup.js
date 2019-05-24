
const PassportLocalStrategy = require('passport-local').Strategy;

const { User } = require('./../../models');

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    fullName: req.body.fullName.trim(),
  };

  User.create(userData)
    .then(user => done(null, user))
    .catch(err => done(err));
});
