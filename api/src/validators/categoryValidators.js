const { body } = require('express-validator');
const validate = require('../middlewares/validate');


const categoryRules = [
    body('category_name').notEmpty().withMessage(' error in category name'),
    body('type').isBoolean().notEmpty().withMessage(' error in category type'),
    validate,
];

module.exports = { categoryRules };