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
exports.deleteBlog = exports.getAllBlog = exports.getBlog = exports.updateBlog = exports.createBlog = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const blogModels_1 = __importDefault(require("../models/blogModels"));
const AppError_1 = require("../utils/AppError");
const getSlug = require('speakingurl');
exports.createBlog = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, title, content, thumbnail, category, user } = req.body;
    console.log(req.body);
    const newBlog = yield blogModels_1.default.create({
        name,
        title,
        content,
        thumbnail,
        category,
        user,
    });
    res.status(200).json({
        blog: newBlog,
    });
}));
exports.updateBlog = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogModels_1.default.findById(req.params.id);
    if (!blog) {
        return next(new AppError_1.AppError('Danh mục không tồn tại', 400));
    }
    const slug = getSlug(req.body.title);
    const result = yield blogModels_1.default.findByIdAndUpdate(req.params.id, Object.assign(Object.assign({}, req.body), { slug }));
    res.status(200).json({
        data: result,
    });
}));
exports.getBlog = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogModels_1.default.findById(req.params.id);
    if (!blog) {
        return next(new AppError_1.AppError('Danh mục không tồn tại', 400));
    }
    res.status(200).json({
        data: blog,
    });
}));
exports.getAllBlog = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllBlog = yield blogModels_1.default.find();
    res.status(200).json({
        data: getAllBlog,
    });
}));
exports.deleteBlog = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogModels_1.default.findByIdAndDelete(req.params.id);
    if (!result) {
        return next(new AppError_1.AppError('Danh mục không tồn tại', 400));
    }
    res.status(204).json({
        message: 'Success',
    });
}));
