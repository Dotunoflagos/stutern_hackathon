const Joi = require('joi');
// Schema for registration payload validation
const register = Joi.object({
    email: Joi.string().email().max(100).required().messages({
        'string.email': 'Email must be a valid email address.',
        'string.max': 'Email should not exceed 100 characters.',
        'any.required': 'Email is required.',
    }),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')).min(6).max(10).required().messages({
        'string.pattern.base': 'Password must be alphanumeric.',
        'string.min': 'Password should not be less than 6 characters.',
        'string.max': 'Password should not exceed 10 characters.',
        'any.required': 'Password is required.',
    }),
});

const update = Joi.object({
    firstname: Joi.string().pattern(/^[A-Za-z]+$/).min(3).max(50).required().messages({
        'string.pattern.base': 'Firstname should contain only alphabetic characters.',
        'string.max': 'Firstname should not exceed 50 characters.',
        'any.required': 'Firstname is required.',
    }),
    lastname: Joi.string().pattern(/^[A-Za-z]+$/).min(3).max(50).required().messages({
        'string.pattern.base': 'Lastname should contain only alphabetic characters.',
        'string.max': 'Lastname should not exceed 50 characters.',
        'any.required': 'Lastname is required.',
    }),
    email: Joi.string().email().max(100).required().messages({
        'string.email': 'Email must be a valid email address.',
        'string.max': 'Email should not exceed 100 characters.',
        'any.required': 'Email is required.',
    }),
    phone: Joi.string().length(10).messages({
        'string.length': 'Phone number should be 10 characters long.',
    }),
    username: Joi.string().alphanum().min(3).max(10).required().messages({
        'string.alphanum': 'Username must only contain alphanumeric characters.',
        'string.min': 'Username should have a minimum length of {#limit}.',
        'string.max': 'Username should have a maximum length of {#limit}.',
        'any.required': 'Username is required.',
    }),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')).min(6).max(10).required().messages({
        'string.pattern.base': 'Password must be alphanumeric.',
        'string.min': 'Password should not be less than 6 characters.',
        'string.max': 'Password should not exceed 10 characters.',
        'any.required': 'Password is required.',
    }),
});

const login = Joi.object({
    email: Joi.string().email().max(100).required().messages({
        'string.email': 'Email must be a valid email address.',
        'string.max': 'Email should not exceed 100 characters.',
        'any.required': 'Email is required.',
    }),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')).min(6).max(10).required().messages({
        'string.pattern.base': 'Password must be alphanumeric.',
        'string.min': 'Password should not be less than 6 characters.',
        'string.max': 'Password should not exceed 10 characters.',
        'any.required': 'Password is required.',
    }),
})

const otp = Joi.object({
    email: Joi.string().email().max(100).required().messages({
        'string.email': 'Email must be a valid email address.',
        'string.max': 'Email should not exceed 100 characters.',
        'any.required': 'Email is required.',
    }),
    otp: Joi.string().min(6).max(6).required().messages({
        'string.min': 'Otp must not be less than 6 characters.',
        'string.max': 'Otp should not exceed 6 characters.',
        'any.required': 'Otp is required.',
    }),
});

module.exports = {
    register,
    login,
    otp
};