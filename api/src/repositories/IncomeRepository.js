const pool = require('../config/db');

class IncomeRepository {
    static async getAllOfUser(id) {
        const result = await pool.query(
            'SELECT income_id, income_amount, income_source FROM incomes WHERE user_income_id = $1 ORDER BY income_id ASC',
            [id]
        );
        return result.rows;
    }

    static async create({ user_id, income_amount, income_source }) {
        const result = await pool.query(
            `INSERT INTO incomes (user_income_id, income_amount, income_source)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [user_id, income_amount, income_source]
        );

        return result.rows[0];
    }

    static async update(id, {income_amount, income_source}) {
        const result = await pool.query(
            `UPDATE incomes
            SET income_amount = $1,
                income_source = $2
            WHERE income_id = $3
            RETURNING income_id, income_amount, income_source`,
            [income_amount, income_source, id]
        );

        return result.rows[0] || null;
    }

    static async remove(id) {
        const result = await pool.query(
            `DELETE FROM incomes WHERE income_id = $1 RETURNING *`,
            [id]
        );
        return result.rowCount > 0;
    }
}

module.exports = IncomeRepository;