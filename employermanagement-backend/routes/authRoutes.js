import express from "express";
import { registerUser, registerAdmin, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/register-admin", registerAdmin);
router.post("/login", login);

export default router;
