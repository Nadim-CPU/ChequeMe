const bcrypt = require('bcryptjs');
const UserRepository = require('../repositories/'); // FIX ME
const APIError = require('../middlewares/'); // FIX ME


const SALT_ROUNDS = 10;

class AuthService {
    static async register({ user_first_name, user_last_name, password, user_dob, user_email }) {
        const doesEmailExist = await UserRepository.findByEmail(user_email);
        if (doesEmailExist) {
            throw APIError.conflict('EMAIL ALREADY REGISTERED', { user_email: ' Email is already in use'});
        }
        
        

        const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
        return UserRepository.create({ user_first_name, user_last_name, password_hash, user_dob, user_email});
        
    }

    static async login({ user_email, password}) {
        const user = await UserRepository.findByEmail(user_email);
        if (!user) {
            throw APIError.unauthorized('Invalid email or password');
        }
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            throw APIError.unauthorized('Invalid email or password');
        }

        const { password_hash, ...saveUser } = user;
        return saveUser;
    }
}
module.exports = AuthService;