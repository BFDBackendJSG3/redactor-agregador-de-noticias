import NewsCard from './NewsCard';

function NewsSection({ news, handleFavorite }) {
  return (
    <section className="grid grid-cols-1 gap-4 pb-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {news.map((item) => (
        <NewsCard
          key={item.id}
          noticia={item}
          handleFavorite={handleFavorite}
        />
      ))}
    </section>
  );
}

export default NewsSection;
