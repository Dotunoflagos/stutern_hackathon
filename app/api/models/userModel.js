const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password length must be 8 characters and above"],
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: Boolean, 
        default: false 
    },
    otp: {
        type: String,
      },
      isVerified: {
        type: Boolean,  
        default: false, 
      },
      resetPasswordOTP: {
        type: String
      },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
