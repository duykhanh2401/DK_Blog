import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';
import { promisify } from 'util';
const createToken = (username: string) => {
	return jwt.sign({ username }, `${process.env.JWT_SECRET}`, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createAndSendToken = (
	username: string,
	statusCode: number,
	res: Response,
) => {
	const token = createToken(username);

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

const login = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { username, password } = req.body;
		if (!username) {
			return next(new AppError('Nhập tên người dùng', 400));
		}
		if (!password) {
			return next(new AppError('Nhập tên mật khẩu', 400));
		}

		if (
			username !== process.env.USERNAME &&
			password !== process.env.PASSWORD
		) {
			return next(new AppError('Tài khoản hoặc mật khẩu không đúng', 400));
		}

		createAndSendToken(username, 200, res);
	},
);

const logout = (req: Request, res: Response, next: NextFunction) => {
	res.cookie('jwt', 'logOutToken', {
		httpOnly: true,
		expires: new Date(Date.now() + 5000),
	});

	res.status(200).json({
		status: 'success',
	});
};

// exports.protect = catchAsync(
// 	async (req: Request, res: Response, next: NextFunction) => {
// 		let token;
// 		if (
// 			req.headers.authorization &&
// 			req.headers.authorization.startsWith('Bearer ')
// 		) {
// 			token = req.headers.authorization.split(' ')[1];
// 		} else if (req.cookies.jwt) {
// 			token = req.cookies.jwt;
// 		}

// 		if (!token)
// 			return next(
// 				new AppError('Bạn chưa đăng nhập. Vui lòng đăng nhập !', 401),
// 			);

// 		// Verification token

// 		const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

// 		// Check if user still exists || Kiểm tra người dùng tồn tại hay k
// 		const currentUser = await User.findById(decode.id);
// 		if (!currentUser) {
// 			return next(
// 				new AppError(
// 					'The user belonging to this token does no longer exists',
// 					401,
// 				),
// 			);
// 		}

// 		// Kiểm tra người dùng thay đổi mật khẩu sau khi token được tạo
// 		// if (currentUser.changedPasswordAfter(decode.iat)) {
// 		// 	return next(
// 		// 		new AppError(
// 		// 			'User recently changed password! Please log in again',
// 		// 			401,
// 		// 		),
// 		// 	);
// 		// }
// 		req.user = currentUser;
// 		res.locals.user = currentUser;
// 		next();
// 	},
// );
export { login, logout };
