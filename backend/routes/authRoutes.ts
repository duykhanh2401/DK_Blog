import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/register', authController.register);
router.get('/refreshToken', authController.refreshToken);

export default router;
