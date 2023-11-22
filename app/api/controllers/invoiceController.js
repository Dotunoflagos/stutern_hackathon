const Invoice = require('../models/invoiceModel');
const InvoiceCount = require('../models/invoiceCountModel');
const Client = require('../models/clientModel');
const User = require('../models/userModel');
const { generateOTP, sendOTP, sendNewOTP } = require('../utils/sendEmail');
const { initializeTransaction } = require('../utils/paystack');
const validateBody = require('../utils/reqBodyValidator').validateWithSchema;
const registerSchema = require('../utils/joiValidationSchema/user').register;


exports.createInvoice = async (req, res) => {
    try {
        const userId = req.userId;
        const { clientId, amount, product } = req.body;

        let invoiceCount = await InvoiceCount.findOne();
        if (!invoiceCount) {
            invoiceCount = new InvoiceCount();
            await invoiceCount.save();
        }

        // Increment the count and use it as the invoice number
        const invoiceNumber = `INV-${invoiceCount.count + 1}`;

        // Generate payment link
        const paymentLink =  initializeTransaction(email, invoiceNumber, amount).data.authorization_url;
        const newInvoice = new Invoice({
            userId,
            clientId,
            invoiceNumber,
            product,
            amount,
            paymentLink
        });

        const savedInvoice = await newInvoice.save();
        invoiceCount.count = invoiceNumber;
        await invoiceCount.save();
        // Send invoice and payment link to Client
        res.status(201).json({
            message: 'Invoice created successfully.',
            invoice: savedInvoice
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateInvoice = async (req, res) => {
    try {
        const userId = req.userId;
        const { invoiceId, amount } = req.body;

        const existingInvoice = await Invoice.findOne({
            _id: invoiceId,
            userId: userId
        });

        if (!existingInvoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        existingInvoice.amount = amount || existingInvoice.amount;

        const updatedInvoice = await existingInvoice.save();

        res.status(200).json({
            message: 'Invoice details updated.',
            invoice: updatedInvoice
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteInvoice = async (req, res) => {
    try {
        const userId = req.userId;
        const { invoiceId } = req.body;

        const existingInvoice = await Invoice.findOne({
            _id: invoiceId,
            userId: userId
        });

        if (!existingInvoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        await existingInvoice.remove();

        res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllInvoices = async (req, res) => {
    try {
        const userId = req.userId;

        const allInvoices = await Invoice.find({ userId });

        if (!allInvoices || allInvoices.length === 0) {
            return res.status(404).json({ message: 'No invoices found' });
        }

        res.status(200).json(allInvoices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.searchInvoices = async (req, res) => {
    try {
        const { invoiceNumber, amount, name, email, phone } = req.query;
        const userId = req.userId;

        const searchCriteria = { userId };

        // Add search criteria
        if (name) {
            const nameRegex = new RegExp(name, 'i'); // Case-insensitive regex search for name
            searchCriteria.$or = [
                { firstname: nameRegex }, // Match documents with firstName matching name
                { lastname: nameRegex }   // Match documents with lastName matching name
            ];
        }
        if (email) {
            searchCriteria.email = new RegExp(email, 'i'); // Case-insensitive regex search for email
        }
        if (phone) {
            searchCriteria.phone = new RegExp(phone, 'i'); // Case-insensitive regex search for phone
        }
        if (invoiceNumber) {
            searchCriteria.invoiceNumber = new RegExp(invoiceNumber, 'i');
        }
        if (amount) {
            searchCriteria.amount = parseFloat(amount);
        }

        const foundInvoices = await Invoice.find(searchCriteria);

        if (!foundInvoices || foundInvoices.length === 0) {
            return res.status(404).json({ message: 'No invoices found' });
        }

        res.status(200).json(foundInvoices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
