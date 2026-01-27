import { listarNoticias } from '@/services/news-service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleFavorite } from '@/services/users-service';
import { Loader2Icon } from 'lucide-react';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { generatePages } from '@/utils/generatePages';
import NewsHero from '@/components/news/NewsHero';
import NewsSection from '@/components/news/NewsSection';
import PaginationIcons from '@/components/PaginationIcons';
import { toast } from 'sonner';

function NewsByCity() {
  const { cidade } = useParams();
  const queryClient = useQueryClient();

  if (!cidade) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Cidade não encontrada</p>
      </div>
    );
  }

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [cidade]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['news', cidade, page],
    queryFn: () => listarNoticias(page, { municipio: cidade }),
    enabled: !!cidade,
    keepPreviousData: true,
  });

  const toggleFavoritoMutation = useMutation({
    mutationFn: toggleFavorite,
    onSuccess: (data) => {
      toast.success(
        data.favoritado ? 'Adicionado aos favoritos' : 'Removido dos favoritos'
      );
      queryClient.invalidateQueries(['news']);
    },
    onError: (error) => {
      toast.error(
        `Erro ao criar notícia: ${error.response?.data?.error || error.message}`
      );
    },
  });

  const handleFavorite = (id) => {
    toggleFavoritoMutation.mutate(id);
  };

  const news = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;
  const pages = generatePages(page, totalPages);

  const heroNews = news[0];
  const firstSectionNews = news.slice(1);

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Erro ao carregar notícias</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {heroNews && <NewsHero noticia={heroNews} />}
      <div className="pr-6 pl-6 md:p-0">
        <NewsSection news={firstSectionNews} handleFavorite={handleFavorite} />
        {totalPages > 1 && (
          <PaginationIcons
            page={page}
            pages={pages}
            totalPages={totalPages}
            setPage={setPage}
            metaData={meta}
          />
        )}
      </div>
    </div>
  );
}

export default NewsByCity;
