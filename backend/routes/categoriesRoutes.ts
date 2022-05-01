import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';
import * as authController from '../controllers/authController';

const router = Router();
router.use(authController.protect);

router
	.route('/')
	.get(categoryController.getAllCategory)
	.post(categoryController.createCategory);

router
	.route('/:id')
	.get(categoryController.getCategory)
	.patch(categoryController.updateCategory)
	.delete(categoryController.deleteCategory);

export default router;
