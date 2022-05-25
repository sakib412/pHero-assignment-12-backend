import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import 'dotenv/config'

import config from './config';
import errorHandler from './middleware/errorHandler';
import { successResponse } from './utils/response';
import { connect } from './utils/db';
import authRouter from './routes/auth.router';

export const app = express();

// Middleware
app.disable('x-powered-by')
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// Routes
app.get('/', (req, res) => {
    res.json(successResponse({ "message": "Server is running" }));
})
app.use('/', authRouter)

// handle errors
app.use(errorHandler)
export const start = async () => {
    try {
        connect();
        app.listen(config.port, () => {
            console.log(`App listening on PORT: ${config.port}`)
        })
    } catch (e) {
        console.error(e)
    }
}