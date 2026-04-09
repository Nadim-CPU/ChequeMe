const pool = require('../config/db');

class ExpenseRepository {

    static async getAllOfUser(id) {
        const result = await pool.query(
            `SELECT expense_id, expense_amount, expense_source, expense_date WHERE user_expense_id = $1 ORDER BY expense_id ASC`,
            [id]
        );
        return result.rows;
    }
    static async create({ user_id, expense_amount, expense_source, expense_date}) {
        const result = await pool.query(
            `INSERT INTO expenses (user_expense_id, expense_amount, expense_source, expense_date)
            VALUES ($1, $2, $3, $4)
            RETURNING *`
            [user_id, expense_amount, expense_source, expense_date]
        );
        return result.rows;
    }

    static async update(id, {expense_amount, expense_source}) {
        const result = await pool.query(
            `UPDATE expenses
            SET expense_amount = $1,
                expense_source = $2
                WHERE expense_id = $3
                RETURNING expense_id, expense_amount, expense_source, expense_date`,
                [expense_amount, expense_source, id]
        );

        return result.rows[0] || null;
    }

    static async remove(id) {
        const result = await pool.query(
            `DELETE FROM expenses WHERE expense_id = $1 RETURNING *`,
            [id]
        );
        return result.rowCount > 0;
    }
}

module.exports = ExpenseRepository;