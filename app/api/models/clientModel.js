const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the small business owner (assuming 'User' model)
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;