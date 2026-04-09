const CategoryService = require('../services/CategoryService');

class CategoryController {

    static async getAllOfUser(req, res, next) {
        try {
            const categories = await CategoryService.getAllOfUser(req.params.id);
            return res.status(201).json(categories);
        } catch (e) {
            next(e);
        }
    }

    static async create(req, res, next) {
        try {
            const category = await CategoryService.create(req.body);
            return res.status(201).json(category);
        } catch (e) {
            next(e);
        }
    }

    static async update(req, res, next) {
        try {
            const category = await CategoryService.update(req.params.id, req.body);
            return res.json(category);
        } catch (e) {
            next(e);
        }
    }

    static async remove(req, res, next) {
        try {
            const removed = await CategoryService.remove(req.params.id);
            return res.status(204).json(removed);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = CategoryController;