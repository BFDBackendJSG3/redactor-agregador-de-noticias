import NewsCard from './NewsCard';
import SidebarWidget from './SidebarWidget';

function NewsSectionWithWidget({ news, handleFavorite, isSearchQuery }) {
  return (
    <section className="grid grid-cols-1 gap-6 pb-6 lg:grid-cols-12">
      {/* Notícias */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-8">
        {news.map((item) => (
          <NewsCard
            key={item.id}
            noticia={item}
            handleFavorite={handleFavorite}
          />
        ))}
      </div>

      {/* Sidebar */}
      {!isSearchQuery && (
        <div className="col-span-full lg:col-span-4">
          <SidebarWidget />
        </div>
      )}
    </section>
  );
}

export default NewsSectionWithWidget;
