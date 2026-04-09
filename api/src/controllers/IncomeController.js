const IncomeService = require('../services/IncomeService')


class IncomeController {

    static async getAllOfUser(req, res, next) {
        try {
            const incomes = await IncomeService.getAllOfUser(req.params.id);
            return res.status(201).json(incomes);
        } catch (e) {
            next(e);
        }
    }

    static async create(req, res, next) {
        try {
            const income = await IncomeService.create(req.body);
            return res.status(201).json(income);
        } catch (e) {
            next(e);
        }
    }

    static async update(req, res, next) {
        try {
            const income = await IncomeService.update(req.params.id, req.body);
            return res.json(income);
        } catch (e) {
            next(e);
        }
    }

    static async remove(req, res, next) {
        try {
            const removed = await IncomeService.remove(req.params.id);
            return res.status(204).json(removed);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = IncomeController;