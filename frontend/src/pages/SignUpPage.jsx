import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import Header from "../components/Header";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import React from "react";
import RobotImg from "../assests/header_img.png";

// Floating robot image - can be extracted to its own component if used elsewhere
const Robot = () => (
	<motion.img
		src={RobotImg}
		alt="Floating Robot"
		animate={{
			y: [0, -20, 0],
		}}
		transition={{
			duration: 3,
			repeat: Infinity,
			ease: "easeInOut",
		}}
		className="w-48 h-48 mx-auto mb-6"
	/>
);

export default function SignUpPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { signup, isLoading, error } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();
		try {
			await signup(email, password, name);
			navigate("/verify-email");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="relative min-h-screen w-full bg-white flex">
			<Header page="signup" />
			{/* Left side: Sign-up form */}
			<div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
				<div className="max-w-md w-full">
					<h1 className="text-4xl font-bold text-gray-800 mb-2">Create Account</h1>
					<p className="text-gray-600 mb-8">Join us and start your journey.</p>
					<form onSubmit={handleSignUp} className="space-y-4">
						<div>
							<label className="text-sm font-medium text-gray-700">Full Name</label>
							<div className="relative mt-2">
								<User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="John Doe"
									className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>
						<div>
							<label className="text-sm font-medium text-gray-700">Email</label>
							<div className="relative mt-2">
								<Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="you@example.com"
									className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>
						<div>
							<label className="text-sm font-medium text-gray-700">Password</label>
							<div className="relative mt-2">
								<Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
								<input
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="••••••••"
									className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
								>
									{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
								</button>
							</div>
						</div>
						<PasswordStrengthMeter password={password} />
						{error && <p className="text-sm text-red-600 mt-2">{error}</p>}
						<button
							type="submit"
							disabled={isLoading}
							className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex justify-center items-center"
						>
							{isLoading ? <Loader className="w-5 h-5 animate-spin" /> : "Create Account"}
						</button>
					</form>
					<p className="text-sm text-center text-gray-600 mt-8">
						Already have an account?{" "}
						<Link to="/login" className="font-medium text-blue-600 hover:underline">
							Login here
						</Link>
					</p>
				</div>
			</div>
			{/* Right side: Welcome message */}
			<div className="hidden md:flex w-1/2 bg-gray-50 flex-col justify-center items-center text-center p-12">
				<Robot />
				<h2 className="text-4xl font-bold text-gray-800 mb-2">Hey Developer! 👋</h2>
				<h3 className="text-5xl font-extrabold text-gray-900 mb-4">Welcome to our App</h3>
				<p className="text-gray-600 max-w-sm">
					Let's start with a quick product tour and we will have you up and running in no time!
				</p>
			</div>
		</div>
	);
}
