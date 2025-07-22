import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Loader, ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const { forgotPassword, isLoading, error } = useAuthStore();

	const handleForgotPassword = async (e) => {
		e.preventDefault();
		await forgotPassword(email, () => {
			toast.success("Password reset link sent! Check your email.");
			setEmail("");
		});
	};

	return (
		<div className="relative min-h-screen w-full bg-white flex flex-col justify-center items-center">
			<Header page="forgot-password" />
			<div className="w-full max-w-md p-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center"
				>
					<h1 className="text-4xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
					<p className="text-gray-600 mb-8">
						No worries! Enter your email and we'll send you a reset link.
					</p>
				</motion.div>
				<form onSubmit={handleForgotPassword} className="space-y-6">
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
					{error && <p className="text-sm text-red-600">{error}</p>}
					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex justify-center items-center"
					>
						{isLoading ? <Loader className="w-5 h-5 animate-spin" /> : "Send Reset Link"}
					</button>
				</form>
				<div className="text-center mt-8">
					<Link to="/login" className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600">
						<ArrowLeft className="w-4 h-4" />
						Back to Login
					</Link>
				</div>
			</div>
		</div>
	);
}
