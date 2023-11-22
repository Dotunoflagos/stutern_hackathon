const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceCountSchema = new Schema({
    count: {
        type: Number,
        default: 0
    }
});

const InvoiceCount = mongoose.model('InvoiceCount', invoiceCountSchema);
module.exports = InvoiceCount;