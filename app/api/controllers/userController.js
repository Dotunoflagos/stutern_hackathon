const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');
const { generateOTP, sendOTP, sendNewOTP } = require('../utils/sendEmail');
const registerSchema = require('./validation/user').register;
const loginSchema = require('./validation/user').login;

// user registration logic
exports.register = async (req, res) => {
  try {
    // Validate request body against the Joi schema
    const { error } = registerSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessage });
    }

    const { firstname, lastname, email, phone, username, password } = req.body;

    // Check if the username already exists
    await User.deleteOne({ email });
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Generate a random OTP
    const otp = generateOTP();


    const newUser = new User({
      firstname,
      lastname,
      email,
      phone,
      username,
      password: hashedPassword,
      otp,
    });

    const savedUser = await newUser.save();

    // Send the OTP to the user's email
    sendOTP(email, otp);

    res.status(201).json({
      message: 'Registration successful. Please check your email for the OTP.',
      user: {
        _id: savedUser._id,
        firstname: savedUser.firstname,
        lastname: savedUser.lastname,
        email: savedUser.email,
        phone: savedUser.phone,
        username: savedUser.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// verify OTP logic
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Mark the user as verified
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// resend OTP logic
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a new OTP
    const newOTP = sendEmail.generateOTP();

    // Update the OTP in the user document
    user.otp = newOTP;

    // Save the updated user document to the database
    await user.save();

    // Send the new OTP via email using the sendEmail module
    sendEmail.sendNewOTP(user.email, newOTP);

    res.status(200).json({ message: 'New OTP sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

//login logic
exports.login = async (req, res) => {
  try {
    // Validate request body against the Joi schema
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessage });
    }
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Wrong Credentials' });
    }

    // Check if the user is verified
    if (!user.isVerified) {
      return res.status(401).json({ message: 'You are not yet verified' });
    }

    // Generate a token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30m',
    });

    // Set the 'Auth' cookie with the token
    res.cookie('Auth', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// reset password request logic
exports.resetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists based on the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a new OTP
    const newOTP = sendEmail.generateOTP();

    // Update the user's record in the database with the new OTP
    user.otp = newOTP;
    await user.save();

    // Send the new OTP via email
    sendEmail.sendNewOTP(user.email, newOTP);

    res.status(200).json({ message: 'New OTP sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.resetPasswordVerify = async (req, res) => {
  try {
    const { username, otp, newPassword } = req.body;
    const user = await User.findOne({ $or: [{ username }, { email: username }] });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    // OTP is valid, update the user's password
    // const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 rounds of salt

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
    const newOTP = generateOTP();

    //user.otp = null to clear it from the document
    user.otp = null;

    // Save the user document with the OTP  null value
    await user.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


