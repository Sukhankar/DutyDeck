import express from 'express';
import {
  registerUser,
  loginUser,
  registerAdmin,
  loginAdmin
} from '../controllers/authController.js';

const router = express.Router();

// User Routes
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// Admin Routes
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);

export default router;
