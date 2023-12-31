const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
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
        type: String
    },
    role: {
        type: Boolean,
        default: false
    },
    businessname: {
        type: String,
        unique: true
    },
    businessaddress: {
        type: String
    },
    imageURL: {
        type: String
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
