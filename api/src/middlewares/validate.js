const { validationResult } = require('express-validator');
const APIError = require('./APIError');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const details = {};
        errors.array().forEach((err) => {
            details[err.path] = err.msg;
        });
        throw APIError.badRequest('Validation failed', details);
    }
    next();
};

module.exports = validate;
