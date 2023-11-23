const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');
const { generateOTP, sendOTP, sendNewOTP } = require('../utils/sendEmail');
const validateBody = require('../utils/reqBodyValidator').validateWithSchema;
const registerSchema = require('../utils/joiValidationSchema/user').register;
const loginSchema = require('../utils/joiValidationSchema/user').login;
const otpSchema = require('../utils/joiValidationSchema/user').otp;

// user registration logic
exports.register = async (req, res) => {
  try {
    // Validate request body against the Joi schema
    const error = validateBody(registerSchema, req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const { email, password } = req.body;

    // Check if the username already exists
    await User.deleteOne({ email });

    // Check if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Generate a random OTP
    const otp = generateOTP();


    const newUser = new User({
      email,
      password: hashedPassword,
      otp,
    });

    const savedUser = await newUser.save();

    // Send the OTP to the user's email
    sendOTP(email, otp);

    // Generate a token
    const token = jwt.sign({ page: 1, userId: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: '50m',
    });

    // Set the 'signup' cookie with the token
    res.cookie('signup', token, { maxAge: 3000000, httpOnly: true });

    res.status(201).json({
      message: 'Registration successful. Please check your email for the OTP.',
      user: {
        id: savedUser._id,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// user registration logic
exports.updateUser = async (req, res) => {
  try {
    // Validate request body against the Joi schema
    // const error = validateBody(registerSchema, req.body);

    // if (error) {
    //   return res.status(400).json({ message: error });
    // }

    const { page, firstname, lastname, businessname, businessaddress, email } = req.body;

    const userId = req.userId
    // Check if the username already exists
    const updateUser = await User.findById(userId);

    if (!updateUser) {
      return res.status(409).json({ message: 'No user found' });
    }

    if (!updateUser.isVerified) {
      return res.status(401).json({ message: 'User not verified' });
    }

    updateUser.firstname = firstname || updateUser.firstname
    updateUser.lastname = lastname || updateUser.lastname
    updateUser.businessname = businessname || updateUser.businessname
    updateUser.businessaddress = businessaddress || updateUser.businessaddress
    updateUser.email = email || updateUser.email

    await updateUser.save();

    if (page == 2) {
      // delete auth token
      this.logout(req, res, { firstname, lastname, businessname, businessaddress, email })
    } else {
      res.status(201).json({
        message: 'update successful.',
        user: { firstname, lastname, businessname, businessaddress, email }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// verify OTP logic
exports.verifyOTP = async (req, res) => {
  try {
    // Validate request body against the Joi schema
    const error = validateBody(otpSchema, req.body);

    if (error) {
      return res.status(400).json({ message: errorMessage });
    }

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
    user.otp = null;
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
    const error = validateBody(loginSchema, req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }
    const { email, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ email });

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
    const exclude = [ "password", "_id", "role", "otp", "__v" ]
    const userData = {};
    Object.keys(user._doc).map((key) => {
      if(!exclude.includes(key)) {
        userData[key] = user[key]
      }
    })
    // Set the 'Auth' cookie with the token
    res.cookie('Auth', token, { maxAge: 1800000, httpOnly: true });
    res.status(200).json({ message: 'Login successful', userData });
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
    // const newOTP = generateOTP();

    // user.otp = null 
    user.otp = null;

    // Save the user document with the OTP  null value
    await user.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout endpoint
// document.cookie = 'Aut=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
exports.logout = (req, res, user) => {
  res.clearCookie('Auth'); // Clear the 'Auth' cookie
  res.clearCookie('signup'); // Clear the 'signup' cookie
  res.status(200).json({ message: 'Logout successful', user});
};
