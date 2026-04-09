const { body } = require('express-validator');
const validate = require('../middlewares/validate');

const registerRules = [
    body('user_first_name').trim().notEmpty().withMessage('First name is required'),
    body('user_last_name').trim().notEmpty().withMessage('Last name is required'),
    body('user_email').trim().isEmail().withMessage('A valid Email is required'),
    body('password').isLength({ min: 8}).withMessage('Password must be at least 8 characters long'),
    validate,
];

const loginRules = [
    body('user_email').trim().isEmail().withMessage('A valid Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    validate,
];

module.exports = { registerRules, loginRules };