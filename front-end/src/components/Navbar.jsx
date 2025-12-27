import {
  CircleUserRound,
  House,
  Info,
  LogIn,
  Mail,
  Menu,
  Newspaper,
  Search,
  SendHorizonal,
} from 'lucide-react';
import { Link, useLocation } from 'react-router';
import ThemeToggleButton from './ThemeToggleButton';
import { useState } from 'react';
import { Input } from './ui/input';

function Navbar() {
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);

  return (
    <div className="bg-background fixed top-0 z-40 w-full border-b">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/** Mobile menu button */}
          <div className="flex items-center gap-4 md:hidden md:gap-8">
            <button
              className="text-foreground"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <Menu strokeWidth={1.5} />
            </button>
          </div>

          <Link to="/" className="font-mono text-xl">
            Comuniq<span className="text-green-700">.PB</span>
          </Link>

          <div className="flex items-center gap-4 md:hidden md:gap-8">
            <button
              className="text-foreground"
              onClick={() => setIsSearchMenuOpen((prev) => !prev)}
            >
              <Search strokeWidth={1.5} />
            </button>
          </div>

          {/* Desktop Navbar */}
          <div className="hidden items-center space-x-8 md:flex">
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
            <Link to="/login" className="text-md font-mono">
              <LogIn />
            </Link>
          </div>
        </div>
      </div>

      {/* Abre ao clicar no componente acima */}
      {isMenuOpen && (
        <>
          {/* overlay clicável */}
          <div
            className="bg-background/20 fixed inset-0 z-40 backdrop-blur-xs"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* sidebar */}
          <div className="bg-background fixed top-0 left-0 z-50 h-full w-65 border-r shadow-lg md:hidden">
            <div className="flex h-16 items-center justify-center">
              <Link
                to="/"
                className="font-mono text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Comuniq<span className="text-green-700">.PB</span>
              </Link>
            </div>
            <div>
              <Link
                to="/login"
                className={
                  location.pathname === '/login'
                    ? 'text-muted-foreground flex gap-1 border-b px-4 py-4'
                    : 'flex gap-1 border-b px-4 py-4'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <CircleUserRound strokeWidth={1.25} />
                Login
              </Link>
              <Link
                to="/"
                className={
                  location.pathname === '/'
                    ? 'text-muted-foreground flex gap-1 border-b px-4 py-4'
                    : 'flex gap-1 border-b px-4 py-4'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <House strokeWidth={1.25} />
                Inicio
              </Link>
              <Link
                to="/"
                className={
                  location.pathname === '/ultimas-noticias'
                    ? 'text-muted-foreground flex gap-1 border-b px-4 py-4'
                    : 'flex gap-1 border-b px-4 py-4'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <Newspaper strokeWidth={1.25} />
                Últimas Notícias
              </Link>
              <Link
                to="/sobre"
                className={
                  location.pathname === '/sobre'
                    ? 'text-muted-foreground flex gap-1 border-b px-4 py-4'
                    : 'flex gap-1 border-b px-4 py-4'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <Info strokeWidth={1.25} />
                Quem Somos
              </Link>
              <Link
                to="/contact"
                className={
                  location.pathname === '/contact'
                    ? 'text-muted-foreground flex gap-1 border-b px-4 py-4'
                    : 'flex gap-1 border-b px-4 py-4'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <Mail strokeWidth={1.25} />
                Entre em Contato
              </Link>
            </div>
          </div>
        </>
      )}
      {/* Barra de pesquisa */}
      {isSearchMenuOpen && (
        <div className="bg-background fixed top-16 right-0 left-0 z-30 mx-auto flex h-20 w-85 items-center gap-2 rounded-b-md border px-4 shadow-lg">
          <Input placeholder="Buscar por:" className="md:text text-[13px]" />
          <button
            type="button"
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground flex h-9 items-center justify-center rounded-md border px-3 transition"
          >
            <SendHorizonal className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
