const nodemailer = require('nodemailer');

const {
  SMTP_SERVER,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
} = require('./../../config');

// create nodemailer transport using settings from .env
const transporter = nodemailer.createTransport({
  host: SMTP_SERVER,
  port: SMTP_PORT,
  secure: false, // TODO: upgrade later with STARTTLS
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

// make sure the mail transport works
transporter.verify((error) => {
  if (error) console.error(error);
  else console.log('Email server ready.');
});

module.exports = transporter;
