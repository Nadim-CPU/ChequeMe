const BudgetService = require('../services/BudgetService');


class BudgetController {
    static async getBudgets(req, res, next) {
        try {
            const budgets = BudgetService.getBudgets(req.params.id);
            res.status(201).json(budgets);
        } catch (e) {
            next(e);
        }
    }

    static async create(req, res, next) {
        try {
            const budget = BudgetService.create(req.body);
            res.status(201).json(budget);
        } catch (e) {
            next(e);
        }
    }

    static async update(req, res, next) {
        try {
            const budget = BudgetService.update(req.params.id, req.body);
            res.json(budget);
        } catch (e) {
            next(e);
        }
    }

    static async remove(req, res, next) {
        try {
            const removed = await BudgetService.remove(req.params.id);
            res.status(204).json(removed);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = BudgetController;