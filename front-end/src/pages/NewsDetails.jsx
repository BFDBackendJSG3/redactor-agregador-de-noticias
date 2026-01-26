import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { detalharNoticia } from '@/services/news-service';
import { Clock10Icon, Loader2Icon } from 'lucide-react';
import { formateOnlyDate } from '@/utils/formatDate';
import { useAuth } from '@/contexts/AuthContext';
import { toggleFavorite } from '@/services/users-service';
import { toast } from 'sonner';
import { Star } from 'lucide-react';

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

  const calcularTempoLeitura = (texto) => {
    const palavrasPorMinuto = 180;
    const totalPalavras = texto?.trim().split(/\s+/).length;
    const minutos = Math.ceil(totalPalavras / palavrasPorMinuto);
    return minutos;
  };

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

  const tempoLeitura = calcularTempoLeitura(noticia.conteudo);

  return (
    <article className="mx-auto mt-2 max-w-4xl space-y-8 px-4 pb-10 md:mt-0 md:px-0">
      {/* HEADER */}
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
        <div className="overflow-hidden rounded-lg">
          <img
            src={noticia.imagemUrl}
            alt={noticia.titulo}
            className="h-55 w-full object-cover md:h-87.5"
          />
        </div>
      )}
      <span className="text-muted-foreground text-sm">
        <div className="flex gap-2">
          <Clock10Icon className="h-4 w-4" />
          <p>{tempoLeitura} min de leitura</p>
        </div>
      </span>
      {/* CONTENT */}
      <section className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed whitespace-pre-wrap">
        {noticia.conteudo}
      </section>
    </article>
  );
}

export default NewsDetails;
