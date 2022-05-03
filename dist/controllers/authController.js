"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.protect = exports.logout = exports.refreshToken = exports.login = exports.register = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../utils/AppError");
const userModels_1 = __importDefault(require("../models/userModels"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, `${process.env.JWT_SECRET}`, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const createRefreshToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, `${process.env.JWT_REFRESH_TOKEN_SECRET}`, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });
};
const createAccessToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, `${process.env.JWT_ACCESS_TOKEN_SECRET}`, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });
};
const createAndSendToken = (user, statusCode, res) => {
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
exports.register = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.password) {
        return next(new AppError_1.AppError('Vui lòng nhập mật khẩu', 400));
    }
    if (req.body.password !== req.body.passwordConfirm) {
        return next(new AppError_1.AppError('Mật khẩu không giống nhau', 400));
    }
    const password = yield bcrypt_1.default.hash(req.body.password, 12);
    const newUser = yield userModels_1.default.create({
        name: req.body.name,
        email: req.body.email,
        password,
    });
    createAndSendToken(newUser, 200, res);
}));
exports.login = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email) {
        return next(new AppError_1.AppError('Nhập tên người dùng', 400));
    }
    if (!password) {
        return next(new AppError_1.AppError('Nhập tên mật khẩu', 400));
    }
    const user = yield userModels_1.default.findOne({ email }).select('+password');
    if (!user) {
        return next(new AppError_1.AppError('Người dùng không tồn tại. Vui lòng đăng ký', 400));
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        return next(new AppError_1.AppError('Mật khẩu không đúng', 400));
    }
    const accessToken = yield createAccessToken(user.id);
    const refreshToken = yield createRefreshToken(user.id);
    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        expires: new Date(Date.now() + 60 * 24 * 60 * 1000 * 1000),
    });
    res.json({
        message: 'Đăng nhập thành công ',
        accessToken,
        user: Object.assign(Object.assign({}, user._doc), { password: '' }),
    });
}));
exports.refreshToken = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
        return next(new AppError_1.AppError('Vui lòng đăng nhập', 400));
    }
    const decode = (jsonwebtoken_1.default.verify(refreshToken, `${process.env.JWT_REFRESH_TOKEN_SECRET}`));
    const user = yield userModels_1.default.findById(decode.id);
    if (!user) {
        return next(new AppError_1.AppError('Token cho người dùng không tồn tại', 401));
    }
    const accessToken = createAccessToken(user.id);
    res.json({ accessToken, user });
}));
const logout = (req, res, next) => {
    res.clearCookie('refresh_token', {
        path: `/api/refresh_token`,
    });
    res.json({ message: 'Đăng xuất thành công' });
};
exports.logout = logout;
exports.protect = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token || token === 'undefined')
        return next();
    // Verification token
    const decode = yield (jsonwebtoken_1.default.verify(token, `${process.env.JWT_ACCESS_TOKEN_SECRET}`));
    // Check if user still exists || Kiểm tra người dùng tồn tại hay k
    const currentUser = yield userModels_1.default.findById(decode.id);
    if (!currentUser) {
        return next();
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
}));
const restrictTo = (...role) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new AppError_1.AppError('Bạn không có quyền truy cập đường dẫn này', 400));
        }
        if (!role.includes(req.user.role)) {
            return next(new AppError_1.AppError('Bạn không có quyền truy cập đường dẫn này', 400));
        }
        next();
    };
};
exports.restrictTo = restrictTo;
