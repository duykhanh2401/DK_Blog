import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';
import { promisify } from 'util';
import User from '../models/userModels';
import { IUser, IDecodedToken } from '../config/interface';
import bcrypt from 'bcrypt';

const createToken = (username: string) => {
	return jwt.sign({ username }, `${process.env.JWT_SECRET}`, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createAndSendToken = (user: IUser, statusCode: number, res: Response) => {
	const token = createToken(user.email);

	res.cookie('jwt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		expires: new Date(Date.now() + 30 * 60 * 24 * 60 * 1000),
	});

	res.status(statusCode).json({
		status: 'success',
		token,
	});
};

export const register = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		if (req.body.password !== req.body.passwordConfirm) {
			return next(new AppError('Mật khẩu không giống nhau', 400));
		}

		const password = await bcrypt.hash(req.body.password, 12);

		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			password,
		});

		createAndSendToken(newUser, 200, res);
	},
);

export const login = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;
		if (!email) {
			return next(new AppError('Nhập tên người dùng', 400));
		}
		if (!password) {
			return next(new AppError('Nhập tên mật khẩu', 400));
		}

		const user = await User.findOne({ email }).select('+password');
		if (!user) {
			return next(
				new AppError('Người dùng không tồn tại. Vui lòng đăng ký', 400),
			);
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return next(new AppError('Mật khẩu không đúng', 400));
		}
		createAndSendToken(user, 200, res);
	},
);

export const logout = (req: Request, res: Response, next: NextFunction) => {
	res.cookie('jwt', 'logOutToken', {
		httpOnly: true,
		expires: new Date(Date.now() + 5000),
	});

	res.status(200).json({
		status: 'success',
	});
};

export const protect = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer ')
		) {
			token = req.headers.authorization.split(' ')[1];
		} else if (req.cookies.jwt) {
			token = req.cookies.jwt;
		}

		if (!token)
			return next(
				new AppError('Bạn chưa đăng nhập. Vui lòng đăng nhập !', 401),
			);

		// Verification token

		const decode = await (<IDecodedToken>(
			jwt.verify(token, `${process.env.JWT_SECRET}`)
		));

		// Check if user still exists || Kiểm tra người dùng tồn tại hay k
		const currentUser = await User.findById(decode.id);
		if (!currentUser) {
			return next(
				new AppError(
					'The user belonging to this token does no longer exists',
					401,
				),
			);
		}

		// Kiểm tra người dùng thay đổi mật khẩu sau khi token được tạo
		// if (currentUser.changedPasswordAfter(decode.iat)) {
		// 	return next(
		// 		new AppError(
		// 			'User recently changed password! Please log in again',
		// 			401,
		// 		),
		// 	);
		// }
		res.locals.user = currentUser;
		next();
	},
);
