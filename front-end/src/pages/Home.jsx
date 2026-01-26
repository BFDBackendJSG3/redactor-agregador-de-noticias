import { listarNoticias } from '@/services/news-service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { generatePages } from '@/utils/generatePages';
import { useSearchParams } from 'react-router';
import NewsHero from '@/components/news/NewsHero';
import { toggleFavorite } from '@/services/users-service';
import { toast } from 'sonner';
import NewsSectionWithWidget from '@/components/news/NewsSectionWithWidget';
import NewsSection from '@/components/news/NewsSection';
import PaginationIcons from '@/components/PaginationIcons';

function Home() {
  const [page, setPage] = useState(1);
  //Busca por notícia
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // reseta paginação ao buscar
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['news', page, debouncedSearch],
    queryFn: () => listarNoticias(page, { search: debouncedSearch }),
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
  const firstSectionNews = news.slice(1, 5);
  const secondSectionNews = news.slice(5);

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
  if (!isLoading && news.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Nenhuma notícia encontrada.</p>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {/* hero */}
      {heroNews && (
        <NewsHero noticia={heroNews} handleFavorite={handleFavorite} />
      )}
      {/* conteudo principal */}
      <div className="pr-6 pl-6 md:p-0">
        {/* Primeira sessao */}
        <NewsSectionWithWidget
          news={firstSectionNews}
          handleFavorite={handleFavorite}
        />
        {/* Segunda sessao */}
        <NewsSection news={secondSectionNews} handleFavorite={handleFavorite} />
        {/* componente de paginação  */}
        {totalPages > 1 && (
          <PaginationIcons
            page={page}
            pages={pages}
            setPage={setPage}
            metaData={meta}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
