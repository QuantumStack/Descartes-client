
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./../../config');
const { User } = require('../../models');

/**
 * Authentication verifier middleware.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like
  // "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;
    
    // check if a user exists
    User.findOne({ where: { id: userId } })
      .then((foundUser) => {
        req.user = foundUser;
        return next();
      })
      .catch(() => res.status(401).end());
  });
};
