import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import Header from "../components/Header";
import React from "react";
import RobotImg from "../assests/header_img.png";

// Floating robot image
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

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const { login, isLoading, error } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password);
	};

	return (
		<div className="relative min-h-screen w-full bg-white flex">
			<Header page="login" />
			{/* Left side: Login form */}
			<div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
				<div className="max-w-md w-full">
					<h1 className="text-4xl font-bold text-gray-800 mb-2">Login</h1>
					<p className="text-gray-600 mb-8">Enter your credentials to access your account.</p>
					<form onSubmit={handleLogin} className="space-y-6">
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
						{error && <p className="text-sm text-red-600">{error}</p>}
						<div className="flex justify-between items-center text-sm">
							<div className="flex items-center gap-2">
								<input type="checkbox" id="remember" className="w-4 h-4 text-blue-600" />
								<label htmlFor="remember" className="text-gray-600">Remember me</label>
							</div>
							<Link to="/forgot-password" className="font-medium text-blue-600 hover:underline">Forgot password?</Link>
						</div>
						<button
							type="submit"
							disabled={isLoading}
							className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex justify-center items-center"
						>
							{isLoading ? <Loader className="w-5 h-5 animate-spin" /> : 'Login'}
						</button>
					</form>
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
