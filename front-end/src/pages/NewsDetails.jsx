import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { detalharNoticia } from '@/services/news-service';
import { Loader2Icon } from 'lucide-react';

function NewsDetails() {
  const { id } = useParams();

  const { data: noticia, isLoading, isError } = useQuery({
    queryKey: ['news-detail', id],
    queryFn: () => detalharNoticia(id),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  if (isError || !noticia) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Notícia não encontrada</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 rounded-lg border bg-card p-6 shadow">
      <h1 className="text-3xl font-bold">{noticia.titulo}</h1>

      <p className="text-sm text-muted-foreground">
        Fonte: {noticia.fonte?.responsavel}
      </p>

      {noticia.imagemUrl && (
        <img
          src={noticia.imagemUrl}
          alt={noticia.titulo}
          className="w-full rounded-lg"
        />
      )}

      <div className="prose max-w-none">
        {noticia.conteudo}
      </div>
    </div>
  );
}

export default NewsDetails;