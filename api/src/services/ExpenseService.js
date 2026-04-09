const ExpenseRepository = require('../repositories/ExpenseRepository')
const UserRepository = require('../repositories/UserRepository');
const APIError = require('../middlewares/APIError')


class ExpenseService {
    static async getAllOfUser(id) {
        const doesIDExist = await UserRepository.findByID(id);
        if (!doesIDExist) {
            throw APIError.notFound(`ID ${id} is non-existent!`);
        }
        return await ExpenseRepository.getAllOfUser(id);
    }

    static async create(data) {
        const doesIDExist = await UserRepository.findByID(data.user_id);
        if (!doesIDExist){
            throw APIError.notFound(`ID ${data.user_id} is non-existent!`);
        }
        return await ExpenseRepository.create(data);
    }

    static async update(id, data) {
        const expnese = await ExpenseRepository.update(id, data);
        if (!expnese) {
            throw APIError.notFound(`Expnese ID ${id} is non-existent!`);
        }
        return expnese;
    }

    static async remove(id) {
        const removed = await ExpenseRepository.remove(id);
        if (!removed){
            throw APIError.notFound(`Expense ID ${id} is non-existent!`);
        }
    }
}

module.exports = ExpenseService;