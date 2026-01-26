import { Link } from 'react-router';

function SidebarWidget({ news }) {
  return (
    <div className="space-y-3 rounded-xl border p-4">
      <h3 className="text-lg">Mais lidas da semana</h3>
      <div className="border-b-2 border-emerald-600" />
      <div className="space-y-3">
        {news.map((item, index) => (
          <Link
            key={item.id}
            className="hover:text-muted-foreground flex items-center gap-3 transition-colors"
            to={`/noticia/${item.id}`}
          >
            <div>
              <p className="text-xl text-emerald-600">{index + 1}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-emerald-600">
                {item.temaPrincipal.nome}
              </p>
              <p className="line-clamp-2 leading-snug">{item.titulo}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SidebarWidget;
