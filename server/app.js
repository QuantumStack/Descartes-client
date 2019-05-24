
const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

const logger = require('morgan');


/**
 * .env configuration
 */
require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

/* Authentication Loading
 *
 * This part of configuration loads modules related to local authentication
 * using Passport.js and JWT.
 */
app.use(passport.initialize());
const localSignupStrategy = require('./util/auth/local-signup');
const localLoginStrategy = require('./util/auth/local-login');

passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// Checks authentication for any API calls.
const authCheckMiddleware = require('./util/auth/local-auth-check');

app.use('/api', authCheckMiddleware);


/**
 * Routing to other aspects.
 */
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

module.exports = app;
