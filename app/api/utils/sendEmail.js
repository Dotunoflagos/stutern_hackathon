const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

function generateOTP() {
  const min = 100000;
  const max = 999999;
  return String(Math.floor(Math.random() * (max - min + 1) + min));
}

function sendOTP({ email, time, firstname, lastname, otp, }) {
  let msg = "Hi"
  if (email) {
    msg = `Hi ${email}`
  } else if (firstname || lastname) {
    msg = `${lastname} ${firstname}`
  }

  const invoiceData = {
    email,
    time: "5 minutes",
    message: msg,
    otp,
  };

  const htmlTemplate = fs.readFileSync(path.join(__dirname, 'otp.html'), 'utf-8');
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
    subject: 'Quickinvoice (OTP for Registration)',
    html: htmlContent
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending OTP: ' + error);
    } else {
      console.log('OTP sent: ' + info.response);
    }
  });
}

function sendNewOTP({ email, time, firstname, lastname, otp, }) {
  let msg = "Hi"
  if (email) {
    msg = `Hi ${email}`
  } else if (firstname || lastname) {
    msg = `${lastname} ${firstname}`
  }

  const invoiceData = {
    email,
    time: "5 minutes",
    message: msg,
    otp,
  };

  const htmlTemplate = fs.readFileSync(path.join(__dirname, 'otp.html'), 'utf-8');
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
    subject: 'Quickinvoice (New OTP for Registration)',
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending new OTP: ' + error);
    } else {
      console.log('New OTP sent: ' + info.response);
    }
  });
}


function sendinvoice({ email, dueDate, firstname, lastname, phone, invoiceNumber, product, amount, businessname, paymentLink }) {
  const tr = `
  <tr>
  <td
    style="
      padding-top: 25px;
      text-align: left;
      padding-left: 10px;
    "
  >
    {{ quantity }}
  </td>
  <td
    style="
      text-align: left;
      font-weight: 400;
      padding-top: 25px;
    "
  >
    {{ name }}
  </td>
  <td
    style="
      text-align: center;
      font-weight: 400;
      padding-top: 25px;
    "
  >
    NGN{{ price }}
  </td>
</tr>
`
  const htmlProduct = product.map((item) => {
    let productData = {
      "name": item.name,
      "price": item.price,
      "quantity": item.quantity,
    }
    return tr.replace(/{{\s*(\w+)\s*}}/g, (match, p1) => {
      return productData[p1] || match;
    });
  })

  const invoiceData = {
    firstname,
    lastname,
    phone,
    invoiceNumber,
    tr: htmlProduct,
    amount: (Number(amount) / 100).toLocaleString('en-US'),
    paymentLink,
    dueDate: new Date(dueDate).toDateString(),
    businessname
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
  const tr = `
  <tr>
  <td
    style="
      padding-top: 25px;
      text-align: left;
      padding-left: 10px;
    "
  >
    {{ quantity }}
  </td>
  <td
    style="
      text-align: left;
      font-weight: 400;
      padding-top: 25px;
    "
  >
    {{ name }}
  </td>
  <td
    style="
      text-align: center;
      font-weight: 400;
      padding-top: 25px;
    "
  >
    NGN{{ price }}
  </td>
</tr>
`
  const htmlProduct = product.map((item) => {
    let productData = {
      "name": item.name,
      "price": item.price,
      "quantity": item.quantity,
    }
    return tr.replace(/{{\s*(\w+)\s*}}/g, (match, p1) => {
      return productData[p1] || match;
    });
  })

  const invoiceData = {
    email,
    amountPaid,
    firstname,
    lastname,
    phone,
    invoiceNumber,
    product,
    paymentDate: new Date(paymentDate).toDateString(),
    paymentMethod,
    businessname,
    amount: (Number(amount) / 100).toLocaleString('en-US'),
    tr: htmlProduct
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
    subject = `Payment of ${invoiceData.amount} From ${invoiceData.lastname} ${invoiceData.firstname} [${invoiceData.invoiceNumber}]`
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
