import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Github, Mail, Lock, User, Server } from "lucide-react";

const features = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
        title: "JWT Auth",
        desc: "Secure authentication with JSON Web Tokens."
    },
    {
        icon: <Mail className="w-8 h-8 text-green-500" />,
        title: "Email Verification",
        desc: "Verify users via email with expiring codes."
    },
    {
        icon: <Lock className="w-8 h-8 text-yellow-500" />,
        title: "Password Reset",
        desc: "Reset forgotten passwords securely."
    },
    {
        icon: <User className="w-8 h-8 text-purple-500" />,
        title: "User Management",
        desc: "Sign up, login, and protected routes."
    }
];

export default function LandingPage() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#00c6fb] flex flex-col justify-center items-center">
            {/* Animated background shapes */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-400 rounded-full blur-3xl z-0"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.12, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-emerald-400 rounded-full blur-2xl z-0"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.10, scale: 1 }}
                transition={{ duration: 1.7, delay: 0.4 }}
                className="absolute bottom-0 left-1/2 w-[350px] h-[350px] bg-purple-400 rounded-full blur-2xl z-0"
            />
            {/* Floating tech badge */}
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="absolute top-8 left-1/2 -translate-x-1/2 z-10"
            >
                <span className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full shadow-lg text-sm font-semibold text-white border border-white/20">
                    <Server className="w-5 h-5 text-emerald-400" /> Built with Node.js, Express, MongoDB
                </span>
            </motion.div>
            {/* Main content card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-3xl mx-auto mt-32 mb-8 px-6"
            >
                <div className="rounded-3xl bg-white/10 backdrop-blur-2xl shadow-2xl border border-white/20 p-10 flex flex-col items-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
                        Secure<span className="text-blue-400">Sign</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl text-center">
                        A full-stack authentication demo built with Node.js, Express, MongoDB, JWT, and React.<br />
                        <span className="text-blue-300">Showcasing backend skills and secure user flows.</span>
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
                        <Link to="/signup">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all focus:ring-2 focus:ring-blue-300 focus:outline-none">
                                Try the Demo
                            </button>
                        </Link>
                        <a href="https://github.com/pranjali7117/SecureSign" target="_blank" rel="noopener noreferrer">
                            <button className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all focus:ring-2 focus:ring-gray-400 focus:outline-none">
                                <Github className="w-6 h-6" /> View on GitHub
                            </button>
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-2">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.04, y: -4 }}
                                className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 flex items-center gap-4 shadow-lg border border-white/20 transition-all cursor-pointer hover:bg-white/30"
                            >
                                <div>{f.icon}</div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{f.title}</h3>
                                    <p className="text-gray-200">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
            {/* Sticky minimal footer */}
            <footer className="fixed bottom-0 left-0 w-full z-20 text-gray-300 text-xs text-center py-3 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none select-none">
                &copy; {new Date().getFullYear()} Pranjali. Backend Demo Project.
            </footer>
        </div>
    );
} 