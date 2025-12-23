import { LogIn } from "lucide-react";
import {Link, useLocation} from "react-router";
import ThemeToggleButton from "./ThemeToggleButton";
import { useState } from "react";

function Navbar() {

    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="border-b bg-background w-full z-40 top-0 fixed">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center">
                    <Link to='/' className="font-mono text-xl">
                        Redactor
                    </Link>
                    {/* Desktop Navbar */}
                    <div className="items-center space-x-8 hidden md:flex">
                        <Link to="/" className={location.pathname === '/' ? 'text-muted-foreground' : ''}>
                            Inicio
                        </Link>
                        <Link to="/sobre" className={location.pathname === '/sobre' ? 'text-muted-foreground' : ''}>
                            Sobre
                        </Link>
                        <ThemeToggleButton/>
                        <Link to="/login" className="font-mono text-md">
                            <LogIn/>
                        </Link>
                    </div>

                    {/** Mobile menu button */}
                    <div className="md:hidden md:gap-8 gap-4 flex items-center">
                        <ThemeToggleButton/>
                        <button className="text-foreground" onClick={() => setIsMenuOpen((prev) => !prev)}>
                            <svg
                                className="w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <div>
                        <Link to="/" className="block px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                            Inicio
                        </Link>
                        <Link to="/sobre" className="block px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                            Sobre
                        </Link>
                        <Link to="/" className="block px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;