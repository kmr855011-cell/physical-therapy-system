import express from 'express';
import { login } from '../controllers/auth/login.js';
import { logout } from '../controllers/auth/logout.js';
import { logoutAll } from '../controllers/auth/logoutAll.js';
import { getMe } from '../controllers/auth/me.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validation.middleware.js';
import { loginValidator } from '../validators/auth.validator.js';

const router = express.Router();

router.post('/login', loginValidator, validateRequest, login);
router.post('/logout', protect, logout);
router.post('/logout-all', protect, logoutAll);
router.get('/me', protect, getMe);

export default router;
