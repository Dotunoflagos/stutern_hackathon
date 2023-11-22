const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authenticateToken} = require('../middleware/authMiddleware.js');

// Route for user registration
router.post('/register', userController.register);

// Route for otp verification
router.post('/verify-otp', userController.verifyOTP);
router.post('/resend-otp', userController.resendOTP);

// Route for user login
router.post('/login', userController.login);

// Route for user login
router.get('/logout', authenticateToken, userController.logout);

// Route for user login
router.put('/updateUser', authenticateToken, userController.updateUser);

// Request Password Reset (Generate OTP)
router.post('/reset-password/request', authenticateToken, userController.resetPasswordRequest);


// Verify OTP and Update Password
router.post('/reset-password/verify', authenticateToken, userController.resetPasswordVerify);

// Resend OTP
// router.post('/reset-password/resend', userController.resetPasswordResend);

module.exports = router;
