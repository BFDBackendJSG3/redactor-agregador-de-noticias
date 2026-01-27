import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { formateDateShort } from '@/utils/formatDate';
import { useAuth } from '@/contexts/AuthContext';

function NewsCard({ noticia, handleFavorite }) {
  const { user } = useAuth();

  return (
    <Link to={`/noticia/${noticia.id}`} className="group flex flex-col">
      {/* IMAGE WRAPPER */}
      <div className="relative overflow-hidden rounded-md">
        <img
          src={noticia.imagemUrl}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-45 xl:h-45"
          alt={noticia.titulo}
        />
        {user && (
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
        )}
      </div>

      {/* CONTENT */}
      <div className="mt-1 flex flex-col justify-between">
        <div className="flex justify-between">
          <span className="text-[12px] font-medium text-emerald-600">
            {noticia.temaPrincipal.nome}
          </span>

          <span className="text-muted-foreground text-[12px]">
            {formateDateShort(new Date(noticia.dataDePublicacao))}
          </span>
        </div>

        <h3 className="group-hover:text-muted-foreground line-clamp-2 leading-snug transition-colors">
          {noticia.titulo}
        </h3>
      </div>
    </Link>
  );
}

export default NewsCard;
