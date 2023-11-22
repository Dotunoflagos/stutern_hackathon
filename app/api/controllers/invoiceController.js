const Invoice = require('../models/invoiceModel');
const InvoiceCount = require('../models/invoiceCountModel');
const Client = require('../models/clientModel');
const User = require('../models/userModel');
const { sendinvoice } = require('../utils/sendEmail');
const { initializeTransaction, verifyTransaction } = require('../utils/paystack');
const validateBody = require('../utils/reqBodyValidator').validateWithSchema;
const registerSchema = require('../utils/joiValidationSchema/user').register;
const crypto = require('crypto');
const secret = process.env.PAYSTACK_KEY;



exports.createInvoice = async (req, res) => {
    try {
        const userId = req.userId;
        const { clientId, amount, product } = req.body;

        let invoiceCount = await InvoiceCount.findOne();
        if (!invoiceCount) {
            invoiceCount = new InvoiceCount();
            await invoiceCount.save();
        }
        const invoiceOwner = await Client.findById(clientId)

        // Increment the count and use it as the invoice number
        const invoiceNumber = `INV-${invoiceCount.count + 1}`;
        invoiceCount.count = invoiceCount.count + 1;
        await invoiceCount.save();

        // Generate payment link
        let paymentLink =  await initializeTransaction(invoiceOwner.email, invoiceNumber, amount);

        paymentLink = paymentLink.data.authorization_url;
        const newInvoice = new Invoice({
            firstname: invoiceOwner.firstname,
            lastname: invoiceOwner.lastname,
            phone: invoiceOwner.phone,
            email: invoiceOwner.email,
            userId,
            clientId,
            invoiceNumber,
            product,
            amount,
            paymentLink
        });

        const savedInvoice = await newInvoice.save();
        
        // Send invoice and payment link to Client
        sendinvoice(savedInvoice);
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
        const { invoiceId } = req.params;

        const existingInvoice = await Invoice.findOne({
            _id: invoiceId,
            userId: userId
        });

        if (!existingInvoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        await existingInvoice.deleteOne();

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

exports.verifyInvoice = async (req, res) => {
    const { reference } = req.query
    console.log( reference )
    const data = await verifyTransaction(reference)
    const invoice = await Invoice.findOne({ invoiceNumber: reference });

    invoice.isPaid = data.data.status == "success"? true : false // || invoice.isPaid
    invoice.amountPaid =  data.data.amount || invoice.amountPaid
    invoice.paymentMethod = data.data.channel || invoice.paymentMethod
    invoice.paymentDate = data.data.paid_at || invoice.paymentDate
    invoice.save()

    res.status(200).json(invoice);
};

exports.invoicesHook = (req, res) => {
    //validate event
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
    // Retrieve the request's body
    const event = req.body;
    console.log(event)
    // Do something with event  
    }
    res.status(200);
}
