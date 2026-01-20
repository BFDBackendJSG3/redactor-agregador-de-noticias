import { listarNoticias } from '@/services/news-service';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { THEMES } from '@/constants/news-themes';

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
    <div className="space-y-4">
      {news.map((item) => (
        <div key={item.id} className="flex flex-col">
          <div>{item.temaPrincipal.nome}</div>
          <div>{item.titulo}</div>
        </div>
      ))}
    </div>
  );
}

export default NewsByTheme;
