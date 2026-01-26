import { Link } from 'react-router-dom';

function NewsRow({ noticia }) {
  return (
    <Link to={`/noticia/${noticia.id}`} className="group flex flex-col">
      {/* IMAGE WRAPPER */}
      <div className="overflow-hidden rounded-md">
        <img
          src={noticia.imagemUrl}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-45 xl:h-45"
          alt={noticia.titulo}
        />
      </div>

      {/* CONTENT */}
      <div className="mt-1 flex flex-col justify-between">
        <div className="flex justify-between">
          <span className="text-[12px] font-medium text-emerald-600">
            {noticia.temaPrincipal.nome}
          </span>

          <span className="text-muted-foreground text-[12px]">
            {new Intl.DateTimeFormat('pt-BR', {
              dateStyle: 'short',
            }).format(new Date(noticia.dataDePublicacao))}
          </span>
        </div>

        <h3 className="group-hover:text-muted-foreground line-clamp-2 leading-snug transition-colors">
          {noticia.titulo}
        </h3>
      </div>
    </Link>
  );
}

export default NewsRow;
