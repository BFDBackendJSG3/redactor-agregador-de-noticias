import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function NewsCard({ noticia }) {
  return (
    <div className="rounded-lg border bg-card shadow-sm">
      {noticia.imagemUrl && (
        <img
          src={noticia.imagemUrl}
          alt={noticia.titulo}
          className="h-48 w-full rounded-t-lg object-cover"
        />
      )}

      <div className="space-y-2 p-4">
        <h3 className="text-lg font-semibold">
          {noticia.titulo}
        </h3>

        {noticia.fonte && (
            <p className="text-sm text-muted-foreground">
                Fonte: {noticia.fonte.responsavel}
            </p>
        )}

        <Button asChild variant="outline" size="sm">
          <Link to={`/noticias/${noticia.id}`}>
            Ver mais
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default NewsCard;