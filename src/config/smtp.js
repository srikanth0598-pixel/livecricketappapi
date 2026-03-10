const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: 'gmail',
    family: 4,
    secure: false,
    auth: {
        user: "srikanth0598@gmail.com",
        pass: "xefn owux bjeo lpuw"
    },
     tls: {
    rejectUnauthorized: false  // Add this
  }
})

module.exports = transporter;