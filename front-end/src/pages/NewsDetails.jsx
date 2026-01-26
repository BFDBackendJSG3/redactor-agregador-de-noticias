import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { detalharNoticia } from '@/services/news-service';
import { Loader2Icon } from 'lucide-react';
import { formateOnlyDate } from '@/utils/formatDate';

function NewsDetails() {
  const { id } = useParams();

  const {
    data: noticia,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['news-detail', id],
    queryFn: () => detalharNoticia(id),
  });

  const calcularTempoLeitura = (texto) => {
    const palavrasPorMinuto = 180;
    const totalPalavras = texto?.trim().split(/\s+/).length;
    const minutos = Math.ceil(totalPalavras / palavrasPorMinuto);
    return minutos;
  };

  console.log(noticia);

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
    <article className="mx-auto mt-5 max-w-4xl space-y-8 px-4 pb-10 md:px-0">
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
          <span className="text-muted-foreground text-sm">
            ⏱ {tempoLeitura} min de leitura
          </span>
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

      {/* CONTENT */}
      <section className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed whitespace-pre-wrap">
        {noticia.conteudo}
      </section>
    </article>
  );
}

export default NewsDetails;
