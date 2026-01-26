import { listarNoticias } from '@/services/news-service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { generatePages } from '@/utils/pagination';
import { useSearchParams } from 'react-router';
import SidebarWidget from '@/components/news/SidebarWidget';
import NewsHero from '@/components/news/NewsHero';
import NewsCard from '@/components/news/NewsCard';
import { toggleFavorite } from '@/services/users-service';
import { toast } from 'sonner';

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
        <section className="relative overflow-hidden rounded-lg">
          <NewsHero noticia={heroNews} handleFavorite={handleFavorite} />
        </section>
      )}

      {/* conteudo principal */}
      <div className="gap-8">
        {/* Primeira sessao */}
        <section className="grid grid-cols-1 gap-6 pb-6 lg:grid-cols-12">
          {/* Notícias */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-8">
            {firstSectionNews.map((item) => (
              <NewsCard
                key={item.id}
                noticia={item}
                handleFavorite={handleFavorite}
              />
            ))}
          </div>

          {/* Sidebar */}
          <div className="col-span-full lg:col-span-4">
            <SidebarWidget news={news.slice(0, 6)} />
          </div>
        </section>
        {/* Segunda sessao */}
        <section className="grid grid-cols-1 gap-4 pb-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {secondSectionNews.map((item) => (
            <NewsCard
              key={item.id}
              noticia={item}
              handleFavorite={handleFavorite}
            />
          ))}
        </section>
        {/* componente de paginação  */}
        {totalPages > 1 && (
          <Pagination className="mb-5">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className={
                    page === 1
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>

              {pages.map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    isActive={p === page}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setPage((p) =>
                      meta?.totalPages
                        ? Math.min(p + 1, meta.totalPages)
                        : p + 1
                    )
                  }
                  className={
                    page === totalPages
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}

export default Home;
