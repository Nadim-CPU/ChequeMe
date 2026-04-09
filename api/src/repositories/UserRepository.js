const pool = require('../config/db');

class UserRepository {
    static async findAll() {
        const result = await pool.query(
            'SELECT user_id, user_first_name, user_last_name, user_email, user_dob FROM users ORDER BY user_id ASC'
        );
        return result.rows;
    }   

    static async findByID(id) {
        const result = await pool.query(
            'SELECT user_Id, user_first_name, user_last_name, user_email, user_dob FROM users WHERE user_id = $1',
            [id]
        );
        return result.rows[0] || null;
    }

    static async findByEmail(email) {
        const result = await pool.query(
            'SELECT * FROM users WHERE user_email = $1',
            [email]
        );
        return result.rows[0] || null;
    }

    static async create({ user_first_name, user_last_name, password_hash, user_dob, user_email }) {
        const result = await pool.query(
            `INSERT INTO users (user_first_name, user_last_name, password_hash, user_dob, user_email)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING user_id, user_first_name, user_last_name, user_email, user_dob`,
            [user_first_name, user_last_name, password_hash || '', user_dob || null, user_email]
        );
        return result.rows[0] || null;
    }

    static async update(id, { user_first_name, user_last_name, user_email}) {
        const result = await pool.query(
            `UPDATE users SET user_first_name = $1, user_last_name = $2, user_email = $3
            WHERE user_id = $4
            RETURN user_id, user_first_name, user_last_name, user_email, user_dob`,
            [user_first_name, user_last_name, user_email, id]
        );
        return result.rows[0] || null;
    }

    static async remove(id) {
        const result = await pool.query(
            'DELETE FROM users WHERE user_id = $1 RETURNING *', [id]
        );
        return result.rowCount > 0;
    }
}

module.exports = UserRepository;