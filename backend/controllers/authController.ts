import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';
import { promisify } from 'util';
import User from '../models/userModels';
import bcrypt from 'bcrypt';
import { IReqAuth, IDecodedToken, IUser } from './../config/interface';
const createToken = (id: string) => {
	return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createRefreshToken = (id: string) => {
	return jwt.sign({ id }, `${process.env.JWT_REFRESH_TOKEN_SECRET}`, {
		expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
	});
};

const createAccessToken = (id: string) => {
	return jwt.sign({ id }, `${process.env.JWT_ACCESS_TOKEN_SECRET}`, {
		expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
	});
};

const createAndSendToken = (user: IUser, statusCode: number, res: Response) => {
	const token = createToken(user.id);

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
		if (!req.body.password) {
			return next(new AppError('Vui lòng nhập mật khẩu', 400));
		}
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

		const accessToken = await createAccessToken(user.id);
		const refreshToken = await createRefreshToken(user.id);
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			path: '/api/refreshToken',
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});

		res.json({
			message: 'Đăng nhập thành công ',
			accessToken,
			user: { ...user._doc, password: '' },
		});
	},
);

export const refreshToken = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const refreshToken = req.cookies.refreshToken;
		if (refreshToken) {
			return next(new AppError('Vui lòng đăng nhập', 400));
		}

		const decode = <IDecodedToken>(
			jwt.verify(refreshToken, `${process.env.JWT_REFRESH_TOKEN_SECRET}`)
		);

		const user = await User.findById(decode.id);
		if (!user) {
			return next(new AppError('Token cho người dùng không tồn tại', 401));
		}

		const accessToken = createAccessToken(user.id);
		res.json({ accessToken });
	},
);

export const logout = (req: Request, res: Response, next: NextFunction) => {
	res.clearCookie('refreshToken', {
		path: `/api/refreshToken`,
	});
	res.json({ message: 'Đăng xuất thành công' });
};

export const protect = catchAsync(
	async (req: IReqAuth, res: Response, next: NextFunction) => {
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
			return next(new AppError('Token cho người dùng không tồn tại', 401));
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
		req.user = currentUser;
		res.locals.user = currentUser;
		next();
	},
);

export const restrictTo = (...role: string[]) => {
	return (req: IReqAuth, res: Response, next: NextFunction) => {
		if (!req.user) {
			return next(
				new AppError('Bạn không có quyền truy cập đường dẫn này', 400),
			);
		}

		if (!role.includes(req.user.role)) {
			return next(
				new AppError('Bạn không có quyền truy cập đường dẫn này', 400),
			);
		}
		next();
	};
};
