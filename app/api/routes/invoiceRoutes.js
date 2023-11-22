const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController.js');
const {authenticateToken} = require('../middleware/authMiddleware.js');

// Route for invoice creation
router.post('/createInvoice', authenticateToken, invoiceController.createInvoice);

router.delete('/deleteInvoice/:invoiceId', authenticateToken, invoiceController.deleteInvoice);

router.get('/getAllInvoices', authenticateToken, invoiceController.getAllInvoices);

router.post('/searchInvoices', authenticateToken, invoiceController.searchInvoices);

// Using Express
router.post("/nvoicesHook", invoiceController.invoicesHook);

router.get("/verifyInvoice", invoiceController.verifyInvoice);

router.get('/total', invoiceController.getTotalInvoiceCreated);

router.get('/completed', invoiceController.totalCompletedPayments);

router.get('/pending', invoiceController.getTotalPendingPayments)

// // Request Password Reset (Generate OTP)
// router.post('/reset-password/request', authenticateToken, invoiceController.resetPasswordRequest);


// // Verify OTP and Update Password
// router.post('/reset-password/verify', authenticateToken, invoiceController.resetPasswordVerify);

// Resend OTP
// router.post('/reset-password/resend', userController.resetPasswordResend);

module.exports = router;
