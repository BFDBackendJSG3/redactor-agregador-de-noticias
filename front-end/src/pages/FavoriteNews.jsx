import { listFavoriteNews } from '@/services/users-service';
import { Loader2Icon } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import NewsCard from '@/components/news/NewsCard';
import { toggleFavorite } from '@/services/users-service';
import { toast } from 'sonner';

function FavoriteNews() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['favorite-news'],
    queryFn: listFavoriteNews,
  });

  const { mutate } = useMutation({
    mutationFn: toggleFavorite,
    onSuccess: (data) => {
      toast.success(
        data.favoritado ? 'Adicionado aos favoritos' : 'Removido dos favoritos'
      );
      queryClient.invalidateQueries(['news']);
      queryClient.invalidateQueries(['news-detail']);
    },
    onError: (error) => {
      toast.error(
        `Erro ao criar notícia: ${error.response?.data?.error || error.message}`
      );
    },
  });

  const news = data || [];

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
        <p className="text-muted-foreground">Nenhuma favorito encontrado.</p>
      </div>
    );
  }

  return (
    <div className="md:py-10">
      <h1 className="mb-6 text-xl font-semibold">Notícias Salvas</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {news.map((noticia) => (
          <NewsCard
            key={noticia.id}
            noticia={noticia}
            handleFavorite={mutate}
          />
        ))}
      </div>
    </div>
  );
}

export default FavoriteNews;
