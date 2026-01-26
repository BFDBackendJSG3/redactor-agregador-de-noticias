import { listarNoticias } from '@/services/news-service';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { THEMES } from '@/constants/news-themes';
import { generatePages } from '@/utils/generatePages';
import NewsHero from '@/components/news/NewsHero';
import NewsSection from '@/components/news/NewsSection';
import PaginationIcons from '@/components/PaginationIcons';

function NewsByTheme() {
  const { tema } = useParams();
  const themeId = THEMES[tema];

  if (!themeId) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Tema não encontrado</p>
      </div>
    );
  }

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [tema]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['news', themeId, page],
    queryFn: () => listarNoticias(page, { tema: themeId }),
    enabled: !!themeId,
    keepPreviousData: true,
  });

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
        <NewsSection news={firstSectionNews} />
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

export default NewsByTheme;
