import { Router } from 'express';
import * as blogController from '../controllers/blogController';
import * as authController from '../controllers/authController';

const router = Router();

router
	.route('/')
	.get(blogController.getAllBlog)
	.post(
		authController.protect,
		authController.restrictTo('admin'),
		blogController.createBlog,
	);

router
	.route('/:id')
	.get(blogController.getBlog)
	.patch(
		authController.protect,
		authController.restrictTo('admin'),
		blogController.updateBlog,
	)
	.delete(
		authController.protect,
		authController.restrictTo('admin'),
		blogController.deleteBlog,
	);

export default router;
