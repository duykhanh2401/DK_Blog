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
exports.deleteCategory = exports.getAllCategory = exports.getCategory = exports.updateCategory = exports.createCategory = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const categoryModels_1 = __importDefault(require("../models/categoryModels"));
const AppError_1 = require("../utils/AppError");
const getSlug = require('speakingurl');
exports.createCategory = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, privacy } = req.body;
    const newCategory = yield categoryModels_1.default.create({ name, privacy });
    res.status(200).json({
        category: newCategory,
    });
}));
exports.updateCategory = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield categoryModels_1.default.findById(req.params.id);
    if (!category) {
        return next(new AppError_1.AppError('Danh mục không tồn tại', 400));
    }
    const slug = getSlug(req.body.name);
    const result = yield categoryModels_1.default.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        slug,
        privacy: req.body.privacy,
    }, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        data: result,
    });
}));
exports.getCategory = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let categoryQuery;
    if (!req.user) {
        categoryQuery = categoryModels_1.default.findById(req.params.id).find({
            isAdmin: { $ne: true },
        });
    }
    else {
        categoryQuery = categoryModels_1.default.findById(req.params.id);
    }
    const category = yield categoryQuery;
    if (!category) {
        return next(new AppError_1.AppError('Danh mục không tồn tại', 400));
    }
    res.status(200).json({
        data: category,
    });
}));
exports.getAllCategory = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let categoryQuery;
    if (!req.user) {
        categoryQuery = categoryModels_1.default.find({ privacy: { $ne: 'private' } });
    }
    else {
        categoryQuery = categoryModels_1.default.find();
    }
    const getAllCategory = yield categoryQuery;
    res.status(200).json({
        data: getAllCategory,
    });
}));
exports.deleteCategory = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield categoryModels_1.default.findByIdAndDelete(req.params.id);
    if (!result) {
        return next(new AppError_1.AppError('Danh mục không tồn tại', 400));
    }
    res.status(204).json({
        message: 'Success',
    });
}));
