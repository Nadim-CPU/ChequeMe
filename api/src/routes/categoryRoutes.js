const { Router } = require('express');
const CategoryController = require('../controllers/CategoryController');
const { categoryRules } = require('../validators/categoryValidators');

const router = Router();

router.get('/', CategoryController.getAllOfUser);
router.post('/', categoryRules,CategoryController.create);
router.put('/:id', categoryRules, CategoryController.update);
router.delete('/:id', CategoryController.remove);


module.exports = router;