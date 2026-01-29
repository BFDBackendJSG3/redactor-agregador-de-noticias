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
import { motion } from 'framer-motion';

function Home() {
  const [page, setPage] = useState(1);
  //Busca por notícia
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isSearchQuery, setIsSearhQuery] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    //se n tiver busca seta como vazio
    if (!search) {
      setIsSearhQuery(false);
      setDebouncedSearch('');
      return;
    }
    //da um tempo para nao fazer uma query a cada letra digitada
    //seta isSearchQuery como true para n mostrar o sidebar na pesquisa
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setIsSearhQuery(true);
      setPage(1); // reseta paginação ao buscar
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  //se não tiver pesquisa seta isSearchQuery como false pois esta na home
  useEffect(() => {
    if (!debouncedSearch) {
      setIsSearhQuery(false);
    }
  }, [debouncedSearch]);

  //use effect para scrolar para o todo ao mudar de pagina
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 50);

    return () => clearTimeout(timeout);
  }, [page]);

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
      <motion.div
        className="flex min-h-screen w-full items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Loader2Icon className="animate-spin" />
      </motion.div>
    );
  }
  if (isError) {
    return (
      <motion.div
        className="flex min-h-screen w-full items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p>Erro ao carregar notícias</p>
      </motion.div>
    );
  }
  if (!isLoading && news.length === 0) {
    return (
      <motion.div
        className="flex min-h-[60vh] items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-muted-foreground">Nenhuma notícia encontrada.</p>
      </motion.div>
    );
  }
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
    >
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
          isSearchQuery={isSearchQuery}
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
    </motion.div>
  );
}

export default Home;
