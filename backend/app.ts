import express from 'express';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';

import cookieParser from 'cookie-parser';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import { xssFilter } from 'helmet';
import authRoutes from './routes/authRoutes';
import categoryRoutes from './routes/categoriesRoutes';
import blogRoutes from './routes/blogRoutes';

import globalErrorHandler from './controllers/errorController';
import { AppError } from './utils/AppError';
import path from 'path';
const app = express();
console.log(process.env.NODE_ENV);

app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());
app.use(ExpressMongoSanitize());
app.use(xssFilter());
const limiter = rateLimit({
	windowMs: 30 * 60 * 1000,
	max: 1000,
	message: 'Too many accounts created from this IP, please try again after 30m',
});
app.use('/api', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/blog', blogRoutes);

app.use(express.static('frontend/build'));
console.log(path.join(__dirname, '../frontend', 'build'));
app.get('*', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
});

app.use(globalErrorHandler);

export { app };
