const { body } = require('express-validator');
const validate = require('../middlewares/validate');

const incomeRules = [
    body('income_amount').notEmpty().isInt().withMessage(' error with income amount! '),
    validate,
];


module.exports = { incomeRules };