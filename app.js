import express from 'express';
//require('express-async-errors')
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
//const bodyParser = require('body-parser')
import MONGODB_URI from './utils/config.js';
import logger from './utils/logger.js';
import blogRouter from './controllers/blogs.js';
import middleware from './utils/middleware.js';

dotenv.config();

const app = express();

mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })

morgan.token('body', (req) => JSON.stringify(req.body));

//app.use(bodyParser.json())
app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

//app.use('/api/login', loginRouter)
//app.use('/api/users', usersRouter)
app.use('/api/blogs', blogRouter)

/*if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
  } */

app.use(middleware.tokenExtractor)
app.use(middleware.tokenValidator)
app.use(middleware.errorHandler)

export default app;