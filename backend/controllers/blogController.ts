import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import Blog from '../models/blogModels';
import { AppError } from '../utils/AppError';
const getSlug = require('speakingurl');

export const createBlog = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { name } = req.body;
		const newBlog = await Blog.create({ name });

		res.status(200).json({
			Blog: newBlog,
		});
	},
);

export const updateBlog = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const blog = await Blog.findById(req.params.id);
		if (!blog) {
			return next(new AppError('Danh mục không tồn tại', 400));
		}
		const slug = getSlug(req.body.name);
		const result = await Blog.findByIdAndUpdate(req.params.id, {
			name: req.body.name,
			slug,
		});

		res.status(200).json({
			data: result,
		});
	},
);

export const getBlog = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const Blog = await Blog.findById(req.params.id);
		if (!Blog) {
			return next(new AppError('Danh mục không tồn tại', 400));
		}

		res.status(200).json({
			data: Blog,
		});
	},
);

export const getAllBlog = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const getAllBlog = await Blog.find();
		res.status(200).json({
			data: getAllBlog,
		});
	},
);

export const deleteBlog = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const result = await Blog.findByIdAndDelete(req.params.id);

		if (!result) {
			return next(new AppError('Danh mục không tồn tại', 400));
		}
		res.status(204).json({
			message: 'Success',
		});
	},
);
