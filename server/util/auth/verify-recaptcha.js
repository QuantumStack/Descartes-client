const request = require('request');

const { RECAPTCHA_SECRET, RECAPTCHA_ENABLED } = require('./../../config');

module.exports = (code, callback) => {
  if (RECAPTCHA_ENABLED) {
    request.post('https://www.google.com/recaptcha/api/siteverify', {
      form: {
        secret: RECAPTCHA_SECRET,
        response: code,
      },
      json: true,
    }, (err, res, body) => {
      if (err) return callback(false);
      return callback(body.success);
    });
  } else {
    callback(true);
  }
};
