const { Router } = require('express');
const IncomeController = require('../controllers/IncomeController')
const { incomeRules } = require('../validators/incomeValidators')

const router = Router();

router.get('/:id', IncomeController.getAllOfUser);
router.post('/', incomeRules, IncomeController.create);
router.put('/:id', incomeRules, IncomeController.update);
router.delete('/:id', IncomeController.remove);


module.exports = router;