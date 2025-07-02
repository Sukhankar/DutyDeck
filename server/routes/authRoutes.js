import express from "express";
import {
  registerUser,
  registerAdmin,
  registerMentor,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword
} from "../controllers/authController.js";

const router = express.Router();

// User registration and authentication routes
router.post("/register-user", registerUser);
router.post("/register-admin", registerAdmin);
router.post("/register-mentor", registerMentor);
router.post("/login", login);

// Password reset routes with enhanced OTP handling
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;