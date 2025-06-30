import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateOTP, generateToken } from "../utils/helpers.js";
import transporter from "../utils/mailer.js";

const JWT_SECRET = process.env.JWT_SECRET || "myjwtsecret";

const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Welcome to Our Platform!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome, ${name}!</h2>
        <p>Thank you for joining our platform. We're excited to have you on board!</p>
        <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The Team</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, organization } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      name, 
      email, 
      password: hashed, 
      organization,
      role: "user" 
    });
    
    await sendWelcomeEmail(email, name);
    
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, organization } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const admin = await User.create({ 
      name, 
      email, 
      password: hashed, 
      organization,
      role: "admin" 
    });
    
    await sendWelcomeEmail(email, name);
    
    res.status(201).json({ message: "Admin registered" });
  } catch (err) {
    res.status(500). json({ error: err.message });
  }
};

export const registerMentor = async (req, res) => {
  try {
    const { name, email, password, organization } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const mentor = await User.create({ 
      name, 
      email, 
      password: hashed, 
      organization,
      role: "mentor" 
    });
    
    await sendWelcomeEmail(email, name);
    
    res.status(201).json({ message: "Mentor registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOTP();
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Password Reset Request</h2>
          <p>Your OTP for password reset is: <strong>${otp}</strong></p>
          <p>This OTP will expire in 1 hour.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (Date.now() > user.resetPasswordExpires) {
      user.resetPasswordOTP = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      return res.status(400).json({ message: "OTP expired. Please request a new one." });
    }

    if (user.resetPasswordOTP?.toLowerCase() !== otp.toLowerCase()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};