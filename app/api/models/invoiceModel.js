const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model name
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client', // Reference to the client's model name
        required: true
    },
    invoiceNumber: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paymentLink: {
        type: String
        // Additional validation or properties can be added as needed
    },
    amountPaid: {
        type: Number
    },
    paymentMethod: {
        type: String
        // Additional validation or properties can be added as needed
    },
    paymentDate: {
        type: Date
    }
    // Other transaction-related fields can be added here
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;