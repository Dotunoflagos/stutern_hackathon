
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AcessCode = require('../models/accessModel');


exports.dashBoard = async (req, res) => {
  // const token = JSON.parse(req.cookies.Auth || '');
  // if (!token) {
  //   console.log('Token not found in the request header');
  //   res.redirect(301, '/login');
  //   //return res.status(401).json({ message: 'Authentication failed' });
  // }

  const userid = req.userId

  const GeneratedAcccessCodes = await AcessCode.find({ userid }).sort({ createdAt: -1 })
  const user = await User.findOne({ _id: userid })
  const username = `${user.lastname} ${user.firstname}`
  const data = {
    GeneratedAcccessCodes,
    username
  };
  res.render('dashboard', { data });
};
