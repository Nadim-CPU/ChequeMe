const BudgetRepository = require('../repositories/BudgetRepository');
const UserRepository = require('../repositories/UserRepository');
const APIError = require('../middlewares/APIError');

class BudgetService {
    static async getBudgets(id) {
        const doesIDExist = await UserRepository.findByID(id);
        if (!doesIDExist) {
            throw APIError.notFound(`ID ${id} is non-existent!`);
        }
        return await BudgetRepository.getBudgets(id);
    }

    static async create(data) {
        const doesIDExist = await UserRepository.findByID(data.user_id);
        if (!doesIDExist) {
            throw APIError.notFound(`ID ${data.user_d} is non-existent!`);
        }
        return await BudgetRepository.create(data);
    }

    static async update(id, data){
        const budget = await BudgetRepository.update(id, data);
        if (!budget) {
            throw APIError.notFound(`Budget ID ${id} is non-existent!`);
        }
        return budget;
    }

    static async remove(id) {
        const removed = await BudgetRepository.remove(id);
        if (!removed) {
            throw APIError.notFound(`Budget ID ${id} is non-existent!`);
        }
    }
}

module.exports = BudgetService;