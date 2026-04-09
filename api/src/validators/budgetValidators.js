const { body } = require('express-validator');
const validate = require('../middlewares/validate');

const budgetRules = [
    body('budget_amount_limit').notEmpty().isInt().withMessage(' error with income amount! '),
    validate,
];

module.exports = { budgetRules };