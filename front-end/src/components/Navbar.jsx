import {
  CircleUserRound,
  House,
  Info,
  Mail,
  Menu,
  Newspaper,
  Search,
} from 'lucide-react';
import { Link, useLocation } from 'react-router';
//import ThemeToggleButton from './ThemeToggleButton';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

function Navbar() {
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);

  return (
    <div className="bg-background fixed top-0 z-40 w-full border-b">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid h-16 grid-cols-3 items-center">
          {/* Coluna 1 */}
          <div className="justify-start">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <Menu strokeWidth={1.5} className="size-6" />
            </Button>
          </div>

          {/* Coluna 2 */}
          <div className="flex justify-center">
            <Link to="/" className="font-mono text-xl">
              Comuniq<span className="text-green-700">.PB</span>
            </Link>
          </div>

          {/* Coluna 3 */}
          <div className="flex justify-end">
            <Button
              size="icon"
              className="md:hidden"
              variant="outline"
              onClick={() => setIsSearchMenuOpen((prev) => !prev)}
            >
              <Search strokeWidth={1.5} className="size-6" />
            </Button>
            {/* Desktop search */}
            <div className="hidden md:flex">
              <Input placeholder="Buscar" className="rounded-r-none" />
              <Button
                size="icon"
                className="rounded-l-none bg-green-700 shadow-xs hover:bg-green-800"
              >
                <Search className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Side bar - Abre ao clicar no componente acima */}
      {isMenuOpen && (
        <>
          {/* overlay clicável */}
          <div
            className="bg-background/20 fixed inset-0 z-40 backdrop-blur-xs"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* sidebar */}
          <div className="bg-card fixed top-0 left-0 z-50 h-full w-65 border-r shadow-lg md:w-90">
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
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setIsSearchMenuOpen(false)}
          ></div>
          <div className="bg-background fixed top-16 right-0 left-0 z-30 mx-auto flex h-20 w-[85%] items-center rounded-b-md border px-4 shadow-xl">
            <Input
              placeholder="Buscar"
              className="rounded-r-none placeholder:text-sm"
            />
            <Button className="rounded-l-none bg-green-700 shadow-xs hover:bg-green-800">
              <Search />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
