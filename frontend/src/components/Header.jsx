import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Header({ page }) {
    const buttonText = page === 'login' ? 'Sign Up' : 'Login';
    const buttonLink = page === 'login' ? '/signup' : '/login';

    return (
        <header className="absolute top-0 left-0 w-full p-8 flex justify-end items-center z-20">
            <Link to={buttonLink}>
                <button className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
                    {buttonText} <ArrowRight className="w-4 h-4" />
                </button>
            </Link>
        </header>
    );
} 