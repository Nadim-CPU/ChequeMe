const { Router } = require('express');
const ExpenseController = require('../controllers/ExpenseController');
const { expenseCreateRules, expenseUpdateRules } = require('../validators/expenseValidators');

const router = Router();

router.get('/', ExpenseController.getAllOfUser);
router.post('/', expenseCreateRules, ExpenseController.create);
router.put('/:id', expenseUpdateRules, ExpenseController.update);
router.delete('/:id', ExpenseController.remove);

module.exports = router;