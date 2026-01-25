import { Link } from 'react-router-dom';

function NewsHero({ noticia }) {
  return (
    <Link to={`/noticia/${noticia.id}`}>
      <div className="group relative h-80 w-full overflow-hidden rounded-lg">
        <img
          src={noticia.imagemUrl}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
          alt={noticia.titulo}
        />

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
