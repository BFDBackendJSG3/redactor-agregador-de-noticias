import { Link } from 'react-router-dom';

function NewsRow({ noticia }) {
  return (
    <Link to={`/noticia/${noticia.id}`} className="rounded-md transition">
      <img
        src={noticia.imagemUrl}
        className="h-40 w-full rounded-md object-cover"
      />

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

        <h3 className="line-clamp-2 leading-snug font-semibold">
          {noticia.titulo}
        </h3>
      </div>
    </Link>
  );
}

export default NewsRow;
