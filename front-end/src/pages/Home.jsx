import { listarNoticias } from '@/services/news-service';
import { useEffect, useState } from 'react';

function Home() {
  const [news, setNews] = useState([]);

  async function fetchNews() {
    try {
      const res = await listarNoticias();
      setNews(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchNews();
  }, []);

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
