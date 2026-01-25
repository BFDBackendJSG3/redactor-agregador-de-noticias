import { Link } from 'react-router-dom';

function NewsRow({ noticia }) {
  return (
    <Link
      to={`/noticia/${noticia.id}`}
      className="hover:bg-muted/40 flex gap-4 rounded-md border-b p-2 pb-4 transition"
    >
      <img
        src={noticia.imagemUrl}
        className="h-24 w-36 rounded-md object-cover"
      />

      <div className="flex flex-col justify-between">
        <span className="text-xs font-medium text-emerald-600">
          {noticia.temaPrincipal.nome}
        </span>

        <h3 className="line-clamp-2 leading-snug font-semibold">
          {noticia.titulo}
        </h3>

        <span className="text-muted-foreground text-xs">
          {new Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'short',
          }).format(new Date(noticia.dataDePublicacao))}
        </span>
      </div>
    </Link>
  );
}

export default NewsRow;
