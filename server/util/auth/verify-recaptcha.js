const request = require('request');

const { RECAPTCHA_SECRET } = require('./../../config');

module.exports = (code, callback) => {
  request.post('https://www.google.com/recaptcha/api/siteverify', {
    form: {
      secret: RECAPTCHA_SECRET,
      response: code,
    },
    json: true,
  }, (err, res, body) => {
    console.log(`Error: ${err}`);

    console.log(`Res: ${res}`);

    console.log(`Body: ${body}`);
    if (err) return callback(false);

    console.log('About to use body.success');
    console.log(`body.success: ${body.success}`);

    return callback(body.success);
  });
};
