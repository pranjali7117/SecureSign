import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Loader, ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const { token } = useParams();
	const navigate = useNavigate();
	const { resetPassword, isLoading, error } = useAuthStore();

	const handleResetPassword = async (e) => {
		e.preventDefault();
		await resetPassword(token, password, () => {
			toast.success("Password reset successfully! You can now log in.");
			navigate("/login");
		});
	};

	return (
		<div className="relative min-h-screen w-full bg-white flex flex-col justify-center items-center">
			<Header page="reset-password" />
			<div className="w-full max-w-md p-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center"
				>
					<h1 className="text-4xl font-bold text-gray-800 mb-2">Reset Your Password</h1>
					<p className="text-gray-600 mb-8">
						Enter your new password below.
					</p>
				</motion.div>
				<form onSubmit={handleResetPassword} className="space-y-4">
					<div>
						<label className="text-sm font-medium text-gray-700">New Password</label>
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
						{isLoading ? <Loader className="w-5 h-5 animate-spin" /> : "Reset Password"}
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
