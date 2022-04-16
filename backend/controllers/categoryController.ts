import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import Categories from '../models/categoryModels';
import { ICategory } from '../config/interface';
import { AppError } from '../utils/AppError';
import { resolveSoa } from 'dns';
const getSlug = require('speakingurl');

export const createCategory = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { name } = req.body;
		const newCategory = await Categories.create({ name });

		res.status(200).json({
			category: newCategory,
		});
	},
);

export const updateCategory = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const category = await Categories.findById(req.params.id);
		if (!category) {
			return next(new AppError('Danh mục không tồn tại', 400));
		}
		const slug = getSlug(req.body.name);
		const result = await Categories.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				slug,
			},
			{
				new: true,
				runValidators: true,
			},
		);
		console.log(result);
		res.status(200).json({
			data: result,
		});
	},
);

export const getCategory = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const category = await Categories.findById(req.params.id);
		if (!category) {
			return next(new AppError('Danh mục không tồn tại', 400));
		}

		res.status(200).json({
			data: category,
		});
	},
);

export const getAllCategory = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const getAllCategory = await Categories.find();
		res.status(200).json({
			data: getAllCategory,
		});
	},
);

export const deleteCategory = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const result = await Categories.findByIdAndDelete(req.params.id);

		if (!result) {
			return next(new AppError('Danh mục không tồn tại', 400));
		}
		res.status(204).json({
			message: 'Success',
		});
	},
);
