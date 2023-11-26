const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number
});

const invoiceSchema = new Schema({
    userId: {
        type: String,
        // ref: 'User', // Reference to the User model name
        required: true
    },
    clientId: {
        type: String,
        // ref: 'Client', // Reference to the client's model name
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

    },
    invoiceNumber: {
        type: String,
        required: true
    },
    product: [productSchema],
    amount: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paymentLink: {
        type: String
    },
    amountPaid: {
        type: Number
    },
    paymentMethod: {
        type: String
    },
    paymentDate: {
        type: Date
    },
    dueDate: {
        type: Date
    },
    send: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;