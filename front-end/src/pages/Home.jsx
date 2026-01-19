import { listarNoticias } from '@/services/news-service';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';

function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['news'],
    queryFn: listarNoticias,
  });

  const news = data?.data || [];
  const meta = data?.meta;

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
    <div>
      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id}>{item.titulo}</div>
        ))}
      </div>
    </div>
  );
}

export default Home;
