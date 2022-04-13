import express from 'express';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';

import cookieParser from 'cookie-parser';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import { xssFilter } from 'helmet';
import authRoutes from './routes/authRoutes';

import globalErrorHandler from './controllers/errorController';
import { AppError } from './utils/AppError';
const app = express();
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
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
app.get('/', (req, res) => {
	res.json({ message: 'Hello' });
});
app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on server !!`, 400));
});

app.use(globalErrorHandler);

export { app };
