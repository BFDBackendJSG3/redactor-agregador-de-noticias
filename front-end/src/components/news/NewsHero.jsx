import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

function NewsHero({ noticia, handleFavorite }) {
  return (
    <Link to={`/noticia/${noticia.id}`}>
      <div className="group relative h-80 w-full overflow-hidden rounded-lg">
        <div>
          <img
            src={noticia.imagemUrl}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            alt={noticia.titulo}
          />
          <button
            className="bg-background/60 hover:bg-background absolute top-2 right-2 z-35 rounded-full p-1 backdrop-blur"
            onClick={(e) => {
              e.preventDefault(); // impede navegação
              e.stopPropagation(); // impede bubble
              handleFavorite(noticia.id);
            }}
          >
            <Star
              className={`h-5 w-5 transition ${
                noticia.isFavorito ? 'fill-yellow-400 text-yellow-400' : ''
              }`}
            />
          </button>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

        <div className="absolute bottom-0 space-y-2 p-6 text-white">
          <span className="text-sm font-medium text-emerald-400">
            {noticia.temaPrincipal.nome}
          </span>

          <h2 className="text-2xl leading-tight font-bold">{noticia.titulo}</h2>
        </div>
      </div>
    </Link>
  );
}

export default NewsHero;
