import { Router } from 'express';
import * as blogController from '../controllers/blogController';
import * as authController from '../controllers/authController';

const router = Router();

router.use(authController.protect);
router
	.route('/')
	.get(blogController.getAllBlog)
	.post(blogController.createBlog);

router
	.route('/:id')
	.get(blogController.getBlog)
	.patch(blogController.updateBlog)
	.delete(blogController.deleteBlog);

export default router;
