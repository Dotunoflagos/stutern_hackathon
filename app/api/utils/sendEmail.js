const nodemailer = require('nodemailer');

function generateOTP() {
  const min = 100000;
  const max = 999999;
  return String(Math.floor(Math.random() * (max - min + 1) + min));
}

function sendOTP(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: 'OTP for Registration',
    text: `Your OTP for registration is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending OTP: ' + error);
    } else {
      console.log('OTP sent: ' + info.response);
    }
  });
}

function sendNewOTP(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: 'New OTP for Registration',
    text: `Your new OTP for registration is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending new OTP: ' + error);
    } else {
      console.log('New OTP sent: ' + info.response);
    }
  });
}

module.exports = {
  generateOTP,
  sendOTP,
  sendNewOTP,
};
