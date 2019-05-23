
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
router.post('/signup', (req, res) => {
  const {
    email, password, fullName,
  } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      error: 'no-email',
      message: 'Please provide your email.',
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      error: 'no-password',
      message: 'Please provide a password',
    });
  }

  if (password.trim().length < 8) {
    return res.status(400).json({
      success: false,
      error: 'password-too-short',
      message: 'Please provide a password of length 8+.',
    });
  }

  if (!fullName) {
    return res.status(400).json({
      success: false,
      error: 'no-fullname',
      message: 'Please provide your full name.',
    });
  }

  return passport.authenticate('local-signup', (err) => {
    // TODO: Fix the user already exists logic.
    if (err) {
      return res.status(409).json({
        success: false,
        error: 'user-already-exists',
        message: 'A user with this email address already exists.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully created an account.',
    });
  })(req, res);
});

module.exports = router;
