const pool = require('../config/db');


class BudgetRepository {
    static async getBudgets(user_budget_id) {
        const result = await pool.query(
            `SELECT budget_id, user_budget_id, category_budget_id, budget_amount_limit,
            start_date, end_date FROM budgets WHERE user_budget_id = $1`,
            [user_budget_id]
        );
        return result.rows;
    }

    static async create(user_id, category_id, amount_limit, start_date, end_date) {
        const result = await pool.query(
            `INSERT INTO budgets (user_budget_id, user_category_id, budget_amount_limit, start_date, end_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [user_id, category_id, amount_limit, start_date, end_date]
        );
        return result.rows[0];
    }

    static async update(budget_id, user_id, amount_limit) {
        const result = await pool.query(
            `UPDATE budgets
            SET budget_amount_limit = $1
            WHERE budget_id = $2
            AND user_budget_id = $3
            RETURNING user_budget_id, category_budget_id, budget_amount_limit, start_date, end_date`,
            [amount_limit, budget_id, user_id]
        );
        return result.rows[0];
    }

    static async remove(id) {
        const result = await pool.query(
            `DELETE FROM budgets WHERE budget_id = $1 RETURNING *`,
            [id]
        );
        return result.rowCount > 0;
    }
}

module.exports = BudgetRepository;