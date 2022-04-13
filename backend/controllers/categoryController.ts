import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import Categories from '../models/categoryModels';

const createCategory = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {},
);
