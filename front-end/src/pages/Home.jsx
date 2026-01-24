import { listarNoticias } from '@/services/news-service';
import { useQuery } from '@tanstack/react-query';
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

function Home() {
  const [page, setPage] = useState(1);
  //Busca por notícia
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const [debouncedSearch, setDebouncedSearch] = useState('');

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

  const news = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;
  const pages = generatePages(page, totalPages);
  console.log(news);

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
    <div className="space-y-6">
      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id}>{item.titulo}</div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination>
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
                    meta?.totalPages ? Math.min(p + 1, meta.totalPages) : p + 1
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
  );
}

export default Home;
