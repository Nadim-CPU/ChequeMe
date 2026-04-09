const APIError = require('./APIError');

const notFound = (req, res, next) => {
    next(APIError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
};

module.exports = notFound;
