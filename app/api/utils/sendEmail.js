const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

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
    subject: 'Quickinvoice (New OTP for Registration)',
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


function sendinvoice({ email, clientId, firstname, lastname, phone, invoiceNumber, product, amount, isPaid, paymentLink }) {
  const invoiceData = {
    firstname,
    lastname,
    phone,
    invoiceNumber,
    product,
    amount: (Number(amount) / 100).toLocaleString('en-US'),
    paymentLink
  };

  const htmlTemplate = fs.readFileSync(path.join(__dirname, 'invoice.html'), 'utf-8');
  const htmlContent = htmlTemplate.replace(/{{\s*(\w+)\s*}}/g, (match, p1) => {
    return invoiceData[p1] || match;
  });

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
    subject: `Quickinvoice Invoice`,
    html: htmlContent
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending new invoice: ' + error);
    } else {
      console.log('New invoice sent: ' + info.response);
    }
  });
}


function sendReceipt({ email, amountPaid, firstname, lastname, phone, invoiceNumber, product, amount, paymentDate, paymentMethod, businessname }, business) {
  const invoiceData = {
    email,
    amountPaid,
    firstname,
    lastname,
    phone,
    invoiceNumber,
    product,
    paymentDate,
    paymentMethod,
    businessname,
    amount: (Number(amount) / 100).toLocaleString('en-US'),
  };

  const htmlTemplate = fs.readFileSync(path.join(__dirname, 'receipt.html'), 'utf-8');
  const htmlContent = htmlTemplate.replace(/{{\s*(\w+)\s*}}/g, (match, p1) => {
    return invoiceData[p1] || match;
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  let subject
  if (business) {
    subject =  `Payment of ${invoiceData.amount} From ${invoiceData.lastname} ${invoiceData.firstname} [${invoiceData.invoiceNumber}]`
  } else {
    subject = `Receipt From ${businessname}`
  }
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: subject,
    html: htmlContent
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending new receipt: ' + error);
    } else {
      console.log('New receipt sent: ' + info.response);
    }
  });
}

module.exports = {
  sendReceipt,
  sendinvoice,
  generateOTP,
  sendOTP,
  sendNewOTP,
};
