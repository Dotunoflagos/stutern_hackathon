const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController.js');
const {authenticateToken} = require('../middleware/authMiddleware.js');

// Route for invoice creation
router.post('/createInvoice', invoiceController.createInvoice);

router.post('/deleteInvoice', invoiceController.deleteInvoice);

router.post('/getAllInvoices', invoiceController.getAllInvoices);

router.post('/searchInvoices', invoiceController.searchInvoices);


// // Request Password Reset (Generate OTP)
// router.post('/reset-password/request', authenticateToken, invoiceController.resetPasswordRequest);


// // Verify OTP and Update Password
// router.post('/reset-password/verify', authenticateToken, invoiceController.resetPasswordVerify);

// Resend OTP
// router.post('/reset-password/resend', userController.resetPasswordResend);

module.exports = router;
