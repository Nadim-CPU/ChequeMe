const AuthService = require('../services/AuthService');

class AuthController {
    
    static async register(req, res, next) {
        try {
            const client = await AuthService.register(req.body);
            return res.status(201).json(client);
        } catch (e) {
            next(e);
        }
    }

    static async login(req, res, next) {
        try {
            const client = await AuthService.register(req.body);
            return res.json({ authenticated: true, client});
        } catch(e) {
            next(e);
        }
    }
}

module.exports = AuthController;