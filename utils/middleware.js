import logger from './logger.js';
import jwt from 'jsonwebtoken';

const tokenExtractor = (request, response, next) => {
const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request["token"] = authorization.substring(7)
    } else {
        request.token = null;
    }
    next();
};

//manejo de errores:
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
          error: 'invalid token'
        })
    }
    next(error);
};

const tokenValidator = (request, response, next) => {
    const token = request.token;

    if (!token) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' });
        }
        next();
    } catch (error) {
        next(error);
    }
};

export default {tokenExtractor,errorHandler,tokenValidator};