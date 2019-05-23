
const express = require('express');
const createError = require('http-errors');
const passport = require('passport');

const router = express.Router();

/* POST login. */
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createError(400, 'Provide an email and password.'));
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in.',
      token,
      user: userData,
    });
  })(req, res, next);
});


/* POST signup. */
router.post('/signup', (req, res, next) => {
  const {
    email, password, fullName,
  } = req.body;

  if (!email) return next(createError(400, 'Provide an email.'));
  if (!password) return next(createError(400, 'Provide a password.'));
  if (!fullName) return next(createError(400, 'Provide a full name.'));

  return passport.authenticate('local-signup', (err) => {
    // TODO: Fix the user already exists logic.
    if (err) {
      return next(createError(409, 'User already exists.'));
    }

    return res.status(200);
  })(req, res, next);
});

const authCheckMiddleware = require('./../util/auth/local-auth-check');

router.get('/test', authCheckMiddleware, (req, res) => res.sendStatus(200));

module.exports = router;
