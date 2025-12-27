import {
  CircleUserRound,
  House,
  Info,
  LogIn,
  Mail,
  Newspaper,
} from 'lucide-react';
import { Link, useLocation } from 'react-router';
import ThemeToggleButton from './ThemeToggleButton';
import { useState } from 'react';

function Navbar() {
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="border-b bg-background w-full z-40 top-0 fixed">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="font-mono text-xl">
            Comuniq<span className="text-green-800">.PB</span>
          </Link>
          {/* Desktop Navbar */}
          <div className="items-center space-x-8 hidden md:flex">
            <Link
              to="/"
              className={
                location.pathname === '/' ? 'text-muted-foreground' : ''
              }
            >
              Inicio
            </Link>
            <Link
              to="/sobre"
              className={
                location.pathname === '/sobre' ? 'text-muted-foreground' : ''
              }
            >
              Sobre
            </Link>
            <ThemeToggleButton />
            <Link to="/login" className="font-mono text-md">
              <LogIn />
            </Link>
          </div>

          {/** Mobile menu button */}
          <div className="md:hidden md:gap-8 gap-4 flex items-center">
            <ThemeToggleButton />
            <button
              className="text-foreground"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
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
        <div className="md:hidden fixed top-0 left-0 z-50 h-full w-65 bg-background border-r shadow-lg">
          <div className="h-16 flex items-center justify-center">
            <Link to="/" className="font-mono text-xl">
              Comuniq<span className="text-green-800">.PB</span>
            </Link>
          </div>
          <div>
            <Link
              to="/login"
              className="flex gap-1 px-4 py-4 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              <CircleUserRound strokeWidth={1.25} />
              Login
            </Link>
            <Link
              to="/"
              className="flex gap-1 px-4 py-4 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              <House strokeWidth={1.25} />
              Inicio
            </Link>
            <Link
              to="/"
              className="flex gap-1 px-4 py-4 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              <Newspaper strokeWidth={1.25} />
              Últimas Notícias
            </Link>
            <Link
              to="/sobre"
              className="flex gap-1 px-4 py-4 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              <Info strokeWidth={1.25} />
              Quem Somos
            </Link>
            <Link
              to="/contact"
              className="flex gap-1 px-4 py-4 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              <Mail strokeWidth={1.25} />
              Entre em Contato
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
