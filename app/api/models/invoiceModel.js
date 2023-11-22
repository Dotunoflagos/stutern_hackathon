const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    invoiceNumber: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
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
    }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;