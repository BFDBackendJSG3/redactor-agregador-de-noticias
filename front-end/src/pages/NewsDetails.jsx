import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addClickToNews, detalharNoticia } from '@/services/news-service';
import { Clock10Icon, Loader2Icon } from 'lucide-react';
import { formateOnlyDate } from '@/utils/formatDateAndText';
import { useAuth } from '@/contexts/AuthContext';
import { toggleFavorite } from '@/services/users-service';
import { toast } from 'sonner';
import { Star } from 'lucide-react';
import { readingTime } from '@/utils/readingTime';
import { useEffect } from 'react';

function NewsDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: noticia,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['news-detail', id],
    queryFn: () => detalharNoticia(id),
  });

  //se carrega noticia adiciona um click
  useEffect(() => {
    if (noticia?.id) {
      addClickToNews(noticia.id);
    }
  }, [noticia?.id]);

  const { mutate } = useMutation({
    mutationFn: toggleFavorite,
    onSuccess: (data) => {
      toast.success(
        data.favoritado ? 'Adicionado aos favoritos' : 'Removido dos favoritos'
      );
      queryClient.invalidateQueries(['news']);
      queryClient.invalidateQueries(['news-detail', id]);
    },
    onError: (error) => {
      toast.error(
        `Erro ao criar notícia: ${error.response?.data?.error || error.message}`
      );
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2Icon className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || !noticia) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Notícia não encontrada</p>
      </div>
    );
  }

  const tempoLeitura = readingTime(noticia.conteudo);
  const isPreview = noticia.status === 'aguardando_revisao';

  return (
    <article className="mx-auto mt-2 max-w-4xl space-y-8 px-4 pb-10 md:mt-0 md:px-0">
      {/* HEADER */}
      {isPreview && (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-yellow-400/40 bg-yellow-100/50 px-4 py-2 text-sm text-yellow-800 dark:border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-500">
          <Clock10Icon className="h-4 w-4" />
          <span>
            Esta notícia é um <strong>preview</strong> e pode sofrer alterações.
          </span>
        </div>
      )}
      <header className="space-y-3">
        <h1 className="text-2xl leading-tight font-bold md:text-3xl lg:text-4xl">
          {noticia.titulo}
        </h1>

        <div className="flex justify-between">
          <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
            <span>
              Fonte: <strong>{noticia.fonte?.responsavel}</strong>
            </span>
            <span>•</span>
            <span>{formateOnlyDate(new Date(noticia.dataDePublicacao))}</span>
          </div>
          {user && (
            <button className="" onClick={() => mutate(noticia.id)}>
              <Star
                className={`h-5 w-5 transition ${
                  noticia.isFavorito ? 'fill-yellow-400 text-yellow-400' : ''
                }`}
              />
            </button>
          )}
        </div>
      </header>

      {/* SEPARADOR */}
      <hr className="border-muted" />

      {/* IMAGE */}
      {noticia.imagemUrl && (
        <div className="space-y-2">
          <div className="overflow-hidden rounded-lg">
            <img
              src={noticia.imagemUrl}
              alt={noticia.titulo}
              className="h-55 w-full object-cover md:h-87.5"
            />
          </div>
          <div className="flex justify-end">
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <Clock10Icon className="h-4 w-4" />
              <span>{tempoLeitura} min de leitura</span>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <section className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed whitespace-pre-wrap">
        {noticia.conteudo}
      </section>
    </article>
  );
}

export default NewsDetails;
