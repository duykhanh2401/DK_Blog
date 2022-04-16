import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';
import * as authController from '../controllers/authController';

const router = Router();

router
	.route('/')
	.get(categoryController.getAllCategory)
	.post(
		authController.protect,
		authController.restrictTo('admin'),
		categoryController.createCategory,
	);

router
	.route('/:id')
	.get(categoryController.getCategory)
	.patch(
		authController.protect,
		authController.restrictTo('admin'),
		categoryController.updateCategory,
	)
	.delete(
		authController.protect,
		authController.restrictTo('admin'),
		categoryController.deleteCategory,
	);

export default router;
