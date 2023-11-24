const Invoice = require('../models/invoiceModel');
const InvoiceCount = require('../models/invoiceCountModel');
const Client = require('../models/clientModel');
const User = require('../models/userModel');
const { sendinvoice, sendReceipt } = require('../utils/sendEmail');
const { initializeTransaction, verifyTransaction } = require('../utils/paystack');
const validateBody = require('../utils/reqBodyValidator').validateWithSchema;
const registerSchema = require('../utils/joiValidationSchema/user').register;
const crypto = require('crypto');
const secret = process.env.PAYSTACK_KEY;

exports.calculateTotal = (items) => {
    let total = 0;

    items.forEach(item => {
        total += item.price;
    });

    return total;
}

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

        if (!invoiceOwner) {
            return res.status(404).json({ message: 'No clients found, invoice not created' });
        }

        // Increment the count and use it as the invoice number
        const invoiceNumber = `INV-${invoiceCount.count + 1}`;
        invoiceCount.count = invoiceCount.count + 1;
        await invoiceCount.save();

        // Generate payment link
        let paymentLink = await initializeTransaction(invoiceOwner.email, invoiceNumber, amount);
        const invoiceTotal = this.calculateTotal(product) * 100
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
            amount: invoiceTotal,
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
        const { invoiceNumber, amount, name, email, phone, product } = req.query;
        const userId = req.userId;

        const searchCriteria = { userId };

        // search criteria
        if (name) {
            const split = name.split(" ") || 0
            if (split.length <= 1) {
                const nameRegex = new RegExp(name, 'i'); // Case-insensitive regex search for name
                searchCriteria.$or = [
                    { firstname: nameRegex },
                    { lastname: nameRegex }
                ];
            } else {
                searchCriteria.$or = [
                    {
                        $and: [
                            // { firstname: new RegExp(`^${split[0]}$`, 'i') },
                            // { lastname: new RegExp(`^${split[1]}$`, 'i') },
                            { firstname: new RegExp(split[0], 'i') },
                            { lastname: new RegExp(split[1], 'i') },
                        ]
                    },
                    {
                        $and: [
                            // { firstname: new RegExp(`^${split[1]}$`, 'i') },
                            // { lastname: new RegExp(`^${split[0]}$`, 'i') }
                            { firstname: new RegExp(split[1], 'i') },
                            { lastname: new RegExp(split[0], 'i') }
                        ]
                    }
                ];
            }
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
        if (product) {
            searchCriteria.product = new RegExp(product, 'i');
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
    // console.log(reference)
    const data = await verifyTransaction(reference)
    const invoice = await Invoice.findOne({ invoiceNumber: reference });

    invoice.isPaid = data.data.status == "success" ? true : false // || invoice.isPaid
    invoice.amountPaid = data.data.amount || invoice.amountPaid
    invoice.paymentMethod = data.data.channel || invoice.paymentMethod
    invoice.paymentDate = data.data.paid_at || invoice.paymentDate
    invoice.save()

    if (invoice.isPaid) {
        const smallbusiness = User.findById(data.userId)
        const businessname = smallbusiness.businessname || "Quickinvoice"
        invoice.businessname = businessname
        sendReceipt(invoice)

        // send business receipt
        invoice.email = User.businessname.email
        sendReceipt(invoice)
    }
    res.status(200).json(invoice);
};

exports.invoicesHook = (req, res) => {
    // Retrieve the request's body
    const event = req.body;
    console.log("vody:", event)
    // Do something with event 
    res.status(200);
}

exports.getTotalInvoiceCreated = async (req, res) => {
    try {
        const userId = req.userId;
        const invoices = await Invoice.find({ userId });
        const totalAmount = invoices.reduce((acc, invoice) => acc + invoice.amount, 0);
        const numberOfInvoices = invoices.length

        res.json({ numberOfInvoices, totalAmount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.totalCompletedPayments = async (req, res) => {
    try {
        const userId = req.userId;
        const completedInvoices = await Invoice.find({ userId, isPaid: true });
        const totalAmount = completedInvoices.reduce((acc, invoice) => acc + invoice.amountPaid, 0);
        const numberOfInvoices = completedInvoices.length

        res.json({ numberOfInvoices, totalAmount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getTotalPendingPayments = async (req, res) => {
    try {
        const userId = req.userId;
        const pendingPayments = await Invoice.find({ userId, isPaid: false })
        const totalAmount = pendingPayments.reduce((acc, invoice) => acc + invoice.amount, 0);
        const numberOfInvoices = pendingPayments.length

        res.json({ numberOfInvoices, totalAmount });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
