import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import { LogOut, Settings, User, Shield, Clock } from "lucide-react";

const DashboardPage = () => {
	const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
	};

	const sidebarVariants = {
		hidden: { x: -250 },
		visible: {
			x: 0,
			transition: {
				type: "spring",
				stiffness: 50,
				damping: 20,
			},
		},
	};

	const contentVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 100,
			},
		},
	};

	return (
		<div className='flex min-h-screen bg-gray-100'>
			<motion.div
				className='w-64 bg-white shadow-lg p-5 flex flex-col'
				variants={sidebarVariants}
				initial='hidden'
				animate='visible'
			>
				<div className='flex items-center space-x-4 mb-10'>
					<img
						src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`}
						alt='Profile'
						className='w-12 h-12 rounded-full'
					/>
					<div>
						<h2 className='text-lg font-semibold text-gray-800'>{user.name}</h2>
						<span className='text-sm text-gray-500'>Premium Member</span>
					</div>
				</div>
				<nav className='flex-1 space-y-2'>
					<a
						href='#'
						className='flex items-center space-x-3 p-3 bg-blue-500 text-white rounded-lg'
					>
						<User className='w-6 h-6' />
						<span className='font-semibold'>Profile</span>
					</a>
					<a
						href='#'
						className='flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-200 rounded-lg'
					>
						<Settings className='w-6 h-6' />
						<span className='font-semibold'>Settings</span>
					</a>
					<a
						href='#'
						className='flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-200 rounded-lg'
					>
						<Shield className='w-6 h-6' />
						<span className='font-semibold'>Security</span>
					</a>
				</nav>
				<div className='mt-auto'>
					<button
						onClick={handleLogout}
						className='w-full flex items-center justify-center space-x-3 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600'
					>
						<LogOut className='w-6 h-6' />
						<span className='font-semibold'>Logout</span>
					</button>
				</div>
			</motion.div>
			<main className='flex-1 p-10'>
				<motion.div variants={contentVariants} initial='hidden' animate='visible'>
					<h1 className='text-4xl font-bold text-gray-800 mb-2'>
						Welcome Back, {user.name.split(" ")[0]}!
					</h1>
					<p className='text-gray-500 mb-10'>
						Here is a summary of your account activity.
					</p>
					<motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						<motion.div
							className='bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6'
							variants={cardVariants}
						>
							<div className='bg-blue-100 p-4 rounded-full'>
								<User className='w-8 h-8 text-blue-500' />
							</div>
							<div>
								<h3 className='text-lg font-semibold text-gray-700'>
									Profile Information
								</h3>
								<p className='text-gray-500'>Name: {user.name}</p>
								<p className='text-gray-500'>Email: {user.email}</p>
							</div>
						</motion.div>
						<motion.div
							className='bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6'
							variants={cardVariants}
						>
							<div className='bg-green-100 p-4 rounded-full'>
								<Clock className='w-8 h-8 text-green-500' />
							</div>
							<div>
								<h3 className='text-lg font-semibold text-gray-700'>
									Account Activity
								</h3>
								<p className='text-gray-500'>
									<span className='font-bold'>Joined: </span>
									{new Date(user.createdAt).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</p>
								<p className='text-gray-500'>
									<span className='font-bold'>Last Login: </span>
									{formatDate(user.lastLogin)}
								</p>
							</div>
						</motion.div>
						<motion.div
							className='bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6'
							variants={cardVariants}
						>
							<div className='bg-yellow-100 p-4 rounded-full'>
								<Shield className='w-8 h-8 text-yellow-500' />
							</div>
							<div>
								<h3 className='text-lg font-semibold text-gray-700'>
									Security Status
								</h3>
								<p className='text-gray-500'>Two-Factor Auth: Enabled</p>
								<a href='#' className='text-blue-500 hover:underline'>
									Manage Settings
								</a>
							</div>
						</motion.div>
					</motion.div>
				</motion.div>
			</main>
		</div>
	);
};
export default DashboardPage;
