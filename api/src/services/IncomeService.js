const IncomeRepository = require('../repositories/IncomeRepository')
const UserRepository = require('../repositories/UserRepository')
const APIError = require('../middlewares/APIError')


class IncomeService {

    static async getAllOfUser(id) {
        const doesIDExist = await UserRepository.findByID(id);
        if (!doesIDExist) {
            throw APIError.notFound(`ID ${id} is non-existent!`);
        }
        return await IncomeRepository.getAllOfUser(id);
    }

    static async create(data) {
        const doesIDExist = await UserRepository.findByID(data.user_id);
        if (!doesIDExist) {
            throw APIError.notFound(`ID ${data.user_id} is non-existent!`);
        }
        return await IncomeRepository.create();

    }

    static async update(id, data) {
        const income = await IncomeRepository.update(id, data);
        if (!income) {
            throw APIError.notFound(`Income ID ${id} is non-existent!`);
        }
        return income; 
    }

    static async remove(id) {
        const removed = await IncomeRepository.remove(id);
        if (!removed) {
            throw APIError.notFound(`Income ID ${id} is non-existent!`);
        }
    }
}

module.exports = IncomeService;