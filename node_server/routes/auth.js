
const express = require('express');
const passport = require('passport');

const router = express.Router();

const { User, EmailVerificationToken } = require('./../models');
const tokenGenerator = require('./../util/email-verification/generate-token');
const confirmationEmailSender = require('./../util/email-verification/send-confirmation');
const verifyRecaptcha = require('./../util/auth/verify-recaptcha');

const config = require('./../config');

/* POST login. */
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  // Ensure that an email and password exists
  if (!email) {
    return res.status(400).json({
      success: false,
      error: 'no-email',
      message: 'Please provide an email address.',
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      error: 'no-password',
      message: 'Please provide a password',
    });
  }

  // Since we have both a username and password, let's try using our local
  // login strategy through passport.
  return passport.authenticate('local-login', (err, token, user) => {
    if (err) {
      // If our strategy tell us that we have an incorrect credentials error,
      // let's let the user know.
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          error: 'incorrect-credentials',
          message: err.message,
        });
      }

      // If there is some other generic issue, return a 400 error and a generic
      // error message.
      return res.status(400).json({
        success: false,
        error: 'unknown-error',
        message: 'Could not process the form.',
      });
    }

    if (!user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        error: 'unverified-email',
        message: 'Please verify your email address before logging in.',
      });
    }

    // Otherwise, since there is no error, the user can successfully login.
    return res.json({
      success: true,
      message: 'You have successfully logged in.',
      token,
      user,
    });
  })(req, res, next);
});


/* POST signup. */
router.post('/signup', (req, res) => {
  const {
    email, password, fullName,
  } = req.body;

  // If a field is missing, alert the user.
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

  if (config.RECAPTCHA_ENABLED && !req.body['g-recaptcha-response']) {
    return res.status(400).json({
      success: false,
      error: 'invalid-recaptcha',
      message: 'The reCAPTCHA verification failed, please try again.',
    });
  }

  // Let's now verify the reCAPTCHA
  verifyRecaptcha(req.body['g-recaptcha-response'], (result) => {
    if (!result) {
      return res.status(400).json({
        success: false,
        error: 'invalid-recaptcha',
        message: 'The reCAPTCHA verification failed, please try again.',
      });
    }

    // Now, let's try our passport local signup strategy.
    return passport.authenticate('local-signup', (err, user) => {
      // TODO: Fix the user already exists logic.
      if (err) {
        return res.status(409).json({
          success: false,
          error: 'user-already-exists',
          message: 'A user with this email address already exists.',
        });
      }

      // Start the email-confirmation process.
      // TODO: There is 100% a bug with this, but I can't figure out
      // what it is.
      confirmationEmailSender(user).finally(() => res.status(200).json({
        success: true,
        message: 'You have successfully created an account.',
      }));

      /** OLD
      // Alert the user that the account has successfully been created.
      return res.status(200).json({
        success: true,
        message: 'You have successfully created an account.',
      });
      */
    })(req, res);
  });
});

/* POST Verify Email Confirmation */
router.post('/verify', (req, res) => {
  const { email, confirmationId } = req.body;

  User.findOne({ where: { email: email.trim() } })
    .then((user) => {
      // If we could not find the user, abandon immediately.
      if (!user) {
        return res.status(400).json({
          success: false,
          error: 'invalid-email-confirmation',
          message: 'Your email has not been verified.',
        });
      }

      if (user.isEmailVerified) {
        return res.status(400).json({
          success: false,
          error: 'email-already-verified',
          message: 'This email has already been verified.',
        });
      }

      // Now that we have the user, try to find the confirmation.
      EmailVerificationToken.findOne({
        where:
        {
          token: confirmationId.trim(),
          UserId: user.id,
        },
      })
        .then((t) => {
          if (!t) {
            return res.status(400).json({
              success: false,
              error: 'invalid-email-confirmation',
              message: 'Your email has not been verified.',
            });
          }

          user.update({ isEmailVerified: true });
          return res.status(200).json({
            success: true,
            message: 'Your email has been successfully verified.',
          });
        });
    });
});


/* POST resend email verification */
router.post('/resend', (req, res) => {

  User.findOne({ where: { email: req.body.email.trim() } })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          success: false,
          error: 'non-existent-email',
          message: 'An account with this email address does not exist, try signing up first.',
        });
      }

      if (user.isEmailVerified) {
        return res.status(400).json({
          success: false,
          error: 'email-already-verified',
          message: 'This email has already been confirmed.',
        });
      }

      confirmationEmailSender(user).then((error) => {
        if (error && error.name === 'email-verification-too-quickly') {
          return res.status(400).json({
            success: false,
            error: 'email-verification-too-quickly',
            message: 'You have already requested an email verification recently.',
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Another confirmation email has been successfully sent.',
        });
      });
    });
});

/* GET (temporary) generate token */
// router.get('/maketoken', (req, res) => {
//   User.findOne({ where: { email: 'aditya@example.com' } })
//     .then(user => tokenGenerator(user).then(result => res.status(200).json({
//       success: true,
//       token: result,
//     })));
// });

module.exports = router;
