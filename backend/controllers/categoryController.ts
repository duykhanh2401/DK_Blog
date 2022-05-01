import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import Categories from '../models/categoryModels';
import { ICategory, IReqAuth } from '../config/interface';
import { AppError } from '../utils/AppError';
const getSlug = require('speakingurl');

export const createCategory = catchAsync(
	async (req: IReqAuth, res: Response, next: NextFunction) => {
		const { name, privacy } = req.body;
		const newCategory = await Categories.create({ name, privacy });

		res.status(200).json({
			category: newCategory,
		});
	},
);

export const updateCategory = catchAsync(
	async (req: IReqAuth, res: Response, next: NextFunction) => {
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
				privacy: req.body.privacy,
			},
			{
				new: true,
				runValidators: true,
			},
		);
		res.status(200).json({
			data: result,
		});
	},
);

export const getCategory = catchAsync(
	async (req: IReqAuth, res: Response, next: NextFunction) => {
		let categoryQuery;
		if (!req.user) {
			categoryQuery = Categories.findById(req.params.id).find({
				isAdmin: { $ne: true },
			});
		} else {
			categoryQuery = Categories.findById(req.params.id);
		}

		const category = await categoryQuery;
		if (!category) {
			return next(new AppError('Danh mục không tồn tại', 400));
		}

		res.status(200).json({
			data: category,
		});
	},
);

export const getAllCategory = catchAsync(
	async (req: IReqAuth, res: Response, next: NextFunction) => {
		let categoryQuery;
		if (!req.user) {
			categoryQuery = Categories.find({ privacy: { $ne: 'private' } });
		} else {
			categoryQuery = Categories.find();
		}
		const getAllCategory = await categoryQuery;
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
