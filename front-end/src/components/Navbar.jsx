import {
  CircleUserRound,
  House,
  Info,
  Mail,
  Menu,
  Newspaper,
  HeartHandshake,
  Scale,
  Notebook,
  Search,
  ChevronDown,
} from 'lucide-react';
import {
  Link,
  useLocation,
  useMatch,
  useNavigate,
  useSearchParams,
} from 'react-router';
//import ThemeToggleButton from './ThemeToggleButton';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { CITIES_MENU, THEMES_MENU } from '@/constants/nav-links';
import ThemeToggleButton from './ThemeToggleButton';
import { capitalizeString } from '@/utils/formatDateAndText';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);

  //precisa usar useMatch pois a navbar esta fora das rotas, useParams n funciona.
  const themeMatch = useMatch({ path: '/noticias/tema/:tema', end: true });
  const activeThemeSlug = themeMatch?.params?.tema;
  const activeTheme = THEMES_MENU.find((item) => item.slug === activeThemeSlug);

  const cityMatch = useMatch({ path: '/noticias/cidade/:cidade', end: true });
  const activeCitySlug = cityMatch?.params?.cidade;
  const activeCity = CITIES_MENU.find((item) => item.slug === activeCitySlug);

  const isThemeRoute = !!themeMatch;
  const isCityRoute = !!cityMatch;
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  const isAuthRoute =
    location.pathname === '/login' || location.pathname === '/cadastro';

  const isUserRoute =
    location.pathname === '/perfil' ||
    location.pathname === '/admin/usuarios' ||
    location.pathname === '/perfil' ||
    location.pathname === '/noticias-salvas' ||
    location.pathname === '/adicionar-noticia';

  return (
    <div>
      <div className="bg-background fixed top-0 z-40 w-full border-b">
        <div className="mx-auto max-w-7xl px-3 md:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Coluna 1 */}
            <div className="md:hidden">
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
                Comuniq
                <span className="text-emerald-600 hover:text-emerald-700">
                  .PB
                </span>
              </Link>
            </div>

            {/* Coluna 3 */}
            <div className="flex">
              {/* Mobile search */}
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
                <div className="flex">
                  <Input
                    placeholder="Buscar"
                    className="w-60 rounded-r-none"
                    value={search}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSearchParams(value ? { search: value } : {});
                    }}
                  />
                  <Button
                    size="icon"
                    className="rounded-l-none bg-emerald-600 shadow-xs hover:bg-emerald-700"
                  >
                    <Search className="size-5" />
                  </Button>
                </div>
                {user && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700">
                        {user.nome?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="bottom"
                      align="end"
                      sideOffset={6}
                      className="bg-background"
                    >
                      <DropdownMenuLabel className="font-semibold">
                        Olá, {capitalizeString(user.nome)}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/perfil')}>
                        Minha Conta
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          navigate('/noticias-salvas');
                        }}
                      >
                        Notícias Salvas
                      </DropdownMenuItem>
                      {user.tipoUsuario === 'ADMIN' && (
                        <DropdownMenuItem
                          onClick={() => navigate('/admin/usuarios')}
                        >
                          Dashboard Usuários
                        </DropdownMenuItem>
                      )}
                      {(user.tipoUsuario === 'ADMIN' ||
                        user.tipoUsuario === 'JORNALISTA' ||
                        user.tipoUsuario === 'EDITOR' ||
                        user.tipoUsuario === 'ESTAGIARIO') && (
                        <DropdownMenuItem
                          onClick={() => navigate('/adicionar-noticia')}
                        >
                          Dashboard Notícias
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => {
                          logout();
                          navigate('/');
                        }}
                      >
                        Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
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
                  Comuniq<span className="text-emerald-600">.PB</span>
                </Link>
              </div>
              <div className="flex w-full justify-center">
                <Button size="icon" variant="ghost" onClick={toggleTheme}>
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </Button>
              </div>
              <div>
                {!user ? (
                  <Link
                    to="/login"
                    className={
                      isAuthRoute
                        ? 'flex gap-1 border-b px-4 py-4 font-semibold text-emerald-600'
                        : 'flex gap-1 border-b px-4 py-4'
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <CircleUserRound strokeWidth={1.25} />
                    Login
                  </Link>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex cursor-pointer items-center justify-between border-b px-4 py-4">
                        <div
                          className={
                            isUserRoute
                              ? 'flex gap-1 font-semibold text-emerald-600'
                              : 'flex gap-1 font-semibold'
                          }
                        >
                          <CircleUserRound strokeWidth={1.25} />
                          {user.nome}
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      alignOffset={140}
                      sideOffset={-50}
                      align="right"
                      className="bg-card"
                    >
                      <DropdownMenuLabel className="font-semibold">
                        Olá, {capitalizeString(user.nome)}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          navigate('/perfil');
                          setIsMenuOpen(false);
                        }}
                      >
                        Minha Conta
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsMenuOpen(false);
                          navigate('/noticias-salvas');
                        }}
                      >
                        Notícias Salvas
                      </DropdownMenuItem>
                      {user.tipoUsuario === 'ADMIN' && (
                        <DropdownMenuItem
                          onClick={() => {
                            navigate('/admin/usuarios');
                            setIsMenuOpen(false);
                          }}
                        >
                          Dashboard Usuários
                        </DropdownMenuItem>
                      )}
                      {(user.tipoUsuario === 'ADMIN' ||
                        user.tipoUsuario === 'JORNALISTA' ||
                        user.tipoUsuario === 'EDITOR' ||
                        user.tipoUsuario === 'ESTAGIARIO') && (
                        <DropdownMenuItem
                          onClick={() => {
                            setIsMenuOpen(false);
                            navigate('/adicionar-noticia');
                          }}
                        >
                          Dashboard Notícias
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => {
                          logout();
                          navigate('/');
                          setIsMenuOpen(false);
                        }}
                      >
                        Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                <Link
                  to="/"
                  className={
                    location.pathname === '/'
                      ? 'flex gap-1 border-b px-4 py-4 font-semibold text-emerald-600'
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
                      ? 'flex gap-1 border-b px-4 py-4 font-semibold text-emerald-600'
                      : 'flex gap-1 border-b px-4 py-4'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Newspaper strokeWidth={1.25} />
                  Últimas Notícias
                </Link>
                <Link
                  to="/noticias/tema/politica"
                  className={
                    location.pathname === '/noticias/tema/politica'
                      ? 'flex gap-1 border-b px-4 py-4 font-semibold text-emerald-600'
                      : 'flex gap-1 border-b px-4 py-4'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Scale strokeWidth={1.25} />
                  Política
                </Link>
                <Link
                  to="/noticias/tema/saude"
                  className={
                    location.pathname === '/noticias/tema/saude'
                      ? 'flex gap-1 border-b px-4 py-4 font-semibold text-emerald-600'
                      : 'flex gap-1 border-b px-4 py-4'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <HeartHandshake strokeWidth={1.25} />
                  Saúde
                </Link>
                <Link
                  to="/noticias/tema/educacao"
                  className={
                    location.pathname === '/noticias/tema/educacao'
                      ? 'flex gap-1 border-b px-4 py-4 font-semibold text-emerald-600'
                      : 'flex gap-1 border-b px-4 py-4'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Notebook strokeWidth={1.25} />
                  Educação
                </Link>
                <Link
                  to="/sobre"
                  className={
                    location.pathname === '/sobre'
                      ? 'flex gap-1 border-b px-4 py-4 font-semibold text-emerald-600'
                      : 'flex gap-1 border-b px-4 py-4'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Info strokeWidth={1.25} />
                  Quem Somos
                </Link>
                <Link
                  to="/contato"
                  className={
                    location.pathname === '/contato'
                      ? 'flex gap-1 border-b px-4 py-4 font-semibold text-emerald-600'
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
                value={search}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchParams(value ? { search: value } : {});
                }}
              />
              <Button className="rounded-l-none bg-emerald-600 shadow-xs hover:bg-emerald-700">
                <Search />
              </Button>
            </div>
          </>
        )}
      </div>
      {/* Barra de links desktop */}
      <div className="bg-background hidden h-10 w-full border-b md:block">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-center gap-5.5 lg:gap-9">
          <Link
            to="/"
            className={`text-sm transition-colors hover:text-emerald-600 ${
              location.pathname === '/'
                ? 'font-semibold text-emerald-600'
                : 'text-muted-foreground'
            }`}
          >
            Inicio
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`flex items-center gap-1 text-sm transition-colors hover:text-emerald-600 ${
                isCityRoute
                  ? 'font-semibold text-emerald-600'
                  : 'text-muted-foreground'
              }`}
            >
              {activeCity?.label || 'Cidades'}
              <ChevronDown className="mt-0.5 h-4 w-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center" className="bg-card">
              {CITIES_MENU.map((item) => (
                <DropdownMenuItem
                  className="transition-colors! hover:text-emerald-600!"
                  key={item.slug}
                  onClick={() => navigate(`/noticias/cidade/${item.slug}`)}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`flex items-center gap-1 text-sm transition-colors hover:text-emerald-600 ${
                isThemeRoute
                  ? 'font-semibold text-emerald-600'
                  : 'text-muted-foreground'
              }`}
            >
              {activeTheme?.label || 'Temas'}
              <ChevronDown className="mt-0.5 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-card">
              {THEMES_MENU.map((item) => (
                <DropdownMenuItem
                  className="transition-colors! hover:text-emerald-600!"
                  key={item.slug}
                  onClick={() => navigate(`/noticias/tema/${item.slug}`)}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            to="/sobre"
            className={`text-sm transition-colors hover:text-emerald-600 ${
              location.pathname === '/sobre'
                ? 'font-semibold text-emerald-600'
                : 'text-muted-foreground'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Quem Somos
          </Link>
          <Link
            to="/contato"
            className={`text-sm transition-colors hover:text-emerald-600 ${
              location.pathname === '/contato'
                ? 'font-semibold text-emerald-600'
                : 'text-muted-foreground'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contato
          </Link>
          {!user && (
            <Link
              to="/login"
              className={`text-sm transition-colors hover:text-emerald-600 ${
                isAuthRoute
                  ? 'font-semibold text-emerald-600'
                  : 'text-muted-foreground'
              }`}
            >
              Login
            </Link>
          )}
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
