import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
	sendPasswordResetEmail,
	sendResetSuccessEmail,
	sendVerificationEmail,
	sendWelcomeEmail,
} from "../mailtrap/emails.js";
import { User } from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const signupUser = async (req, res, next) => {
	const { email, password, name } = req.body;

	if (!email || !password || !name) {
		return next(new ErrorHandler("All fields are required", 400));
	}

	const userAlreadyExists = await User.findOne({ email });

	if (userAlreadyExists) {
		return next(new ErrorHandler("User already exists", 400));
	}

	const hashedPassword = await bcryptjs.hash(password, 10);
	const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

	const user = new User({
		email,
		password: hashedPassword,
		name,
		verificationToken,
		verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
	});

	await user.save();

	generateTokenAndSetCookie(res, user._id);

	await sendVerificationEmail(user.email, verificationToken);

	res.status(201).json({
		success: true,
		message: "User created successfully",
		user: {
			...user._doc,
			password: undefined,
		},
	});
};

const verifyUserEmail = async (req, res, next) => {
	const { code } = req.body;

	const user = await User.findOne({
		verificationToken: code,
		verificationTokenExpiresAt: { $gt: Date.now() },
	});

	if (!user) {
		return next(new ErrorHandler("Invalid or expired verification code", 400));
	}

	user.isVerified = true;
	user.verificationToken = undefined;
	user.verificationTokenExpiresAt = undefined;
	await user.save();

	await sendWelcomeEmail(user.email, user.name);

	res.status(200).json({
		success: true,
		message: "Email verified successfully",
		user: {
			...user._doc,
			password: undefined,
		},
	});
};

const loginUser = async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		return next(new ErrorHandler("Invalid credentials", 400));
	}

	const isPasswordValid = await bcryptjs.compare(password, user.password);
	if (!isPasswordValid) {
		return next(new ErrorHandler("Invalid credentials", 400));
	}

	generateTokenAndSetCookie(res, user._id);

	user.lastLogin = new Date();
	await user.save();

	res.status(200).json({
		success: true,
		message: "Logged in successfully",
		user: {
			...user._doc,
			password: undefined,
		},
	});
};

const logoutUser = (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

const forgotUserPassword = async (req, res, next) => {
	const { email } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}

	const resetToken = crypto.randomBytes(20).toString("hex");
	const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

	user.resetPasswordToken = resetToken;
	user.resetPasswordExpiresAt = resetTokenExpiresAt;
	await user.save();

	await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

	res.status(200).json({ success: true, message: "Password reset link sent to your email" });
};

const resetUserPassword = async (req, res, next) => {
	const { token } = req.params;
	const { password } = req.body;

	const user = await User.findOne({
		resetPasswordToken: token,
		resetPasswordExpiresAt: { $gt: Date.now() },
	});

	if (!user) {
		return next(new ErrorHandler("Invalid or expired reset token", 400));
	}

	const hashedPassword = await bcryptjs.hash(password, 10);
	user.password = hashedPassword;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpiresAt = undefined;
	await user.save();

	await sendResetSuccessEmail(user.email);

	res.status(200).json({ success: true, message: "Password reset successful" });
};

const checkUserAuth = async (req, res, next) => {
	const user = await User.findById(req.userId).select("-password");
	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}
	res.status(200).json({ success: true, user });
};

export const signup = asyncHandler(signupUser);
export const verifyEmail = asyncHandler(verifyUserEmail);
export const login = asyncHandler(loginUser);
export const logout = asyncHandler(logoutUser);
export const forgotPassword = asyncHandler(forgotUserPassword);
export const resetPassword = asyncHandler(resetUserPassword);
export const checkAuth = asyncHandler(checkUserAuth);
