const { Router } = require('express');
const BudgetController = require('../controllers/BudgetController');
const { budgetRules } = require('../validators/budgetValidators')

const router = Router();

router.get('/:id', BudgetController.getBudgets);
router.post('/', budgetRules, BudgetController.create);
router.put('/:id', budgetRules, BudgetController.update);
router.delete('/:id', BudgetController.remove);

module.exports = router;