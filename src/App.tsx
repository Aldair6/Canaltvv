import React from 'react';
import { 
  Tv2, 
  Clock, 
  TrendingUp, 
  Radio, 
  Newspaper,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';
import { useNews } from './hooks/useNews';
import { NewsGrid } from './components/NewsGrid';

function App() {
  const { news, loading, error } = useNews();
  const currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const featuredNews = news && news.length > 0 ? {
    main: news[0],
    secondary: news.slice(1, 3)
  } : {
    main: {
      title: "Nuevo plan de desarrollo urbano para la ciudad",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1200",
      category: "Local"
    },
    secondary: [
      {
        title: "Avances en energía renovable local",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600",
        category: "Tecnología"
      },
      {
        title: "Festival cultural atrae miles de visitantes",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600",
        category: "Cultura"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center gap-4">
              <Clock className="w-4 h-4" />
              <span>{currentDate}</span>
            </div>
            <div className="flex gap-4">
              <Facebook className="w-4 h-4 cursor-pointer hover:text-gray-200" />
              <Twitter className="w-4 h-4 cursor-pointer hover:text-gray-200" />
              <Instagram className="w-4 h-4 cursor-pointer hover:text-gray-200" />
              <Youtube className="w-4 h-4 cursor-pointer hover:text-gray-200" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Tv2 className="w-8 h-8 text-red-700" />
                <span className="text-3xl font-bold text-red-700">7<span className="text-red-600">MA</span></span>
              </div>
              <div className="flex flex-col leading-tight ml-1">
                <span className="text-lg font-bold text-red-700">TV Digital</span>
                <span className="text-xs text-gray-600">Tu canal de confianza</span>
              </div>
            </div>
            <div className="flex gap-6">
              <button className="flex items-center gap-1 text-red-600 font-semibold hover:text-red-700">
                <Radio className="w-4 h-4" />
                EN VIVO
              </button>
              <a href="#" className="hover:text-red-700">Inicio</a>
              <a href="#" className="hover:text-red-700">Local</a>
              <a href="#" className="hover:text-red-700">Nacional</a>
              <a href="#" className="hover:text-red-700">Deportes</a>
              <a href="#" className="hover:text-red-700">Cultura</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Breaking News */}
        <div className="bg-red-600 text-white px-4 py-2 mb-8 flex items-center gap-2 rounded">
          <TrendingUp className="w-5 h-5" />
          <span className="font-bold">ÚLTIMA HORA:</span>
          <span className="ml-2">
            {news && news.length > 0 ? news[0].title : 'Cargando últimas noticias...'}
          </span>
        </div>

        {/* Featured News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Main Featured */}
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={featuredNews.main.imageUrl || featuredNews.main.image} 
              alt={featuredNews.main.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <span className="text-white bg-red-700 px-2 py-1 rounded text-sm">
                {featuredNews.main.category}
              </span>
              <h2 className="text-white text-2xl font-bold mt-2">
                {featuredNews.main.title}
              </h2>
            </div>
          </div>

          {/* Secondary Featured */}
          <div className="space-y-6">
            {featuredNews.secondary.map((news, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden h-[190px]">
                <img 
                  src={news.imageUrl || news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <span className="text-white bg-red-700 px-2 py-1 rounded text-sm">
                    {news.category}
                  </span>
                  <h3 className="text-white text-lg font-bold mt-2">
                    {news.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest News Section */}
        <div className="flex items-center gap-2 mb-4">
          <Newspaper className="w-6 h-6 text-red-700" />
          <h2 className="text-xl font-bold">Últimas Noticias</h2>
        </div>
        {loading ? (
          <div className="text-center py-8">Cargando noticias...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">Error: {error}</div>
        ) : (
          <NewsGrid news={news} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-red-700 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Tv2 className="w-6 h-6" />
                  <span className="text-2xl font-bold">7<span className="text-white">MA</span></span>
                </div>
                <span className="text-lg font-bold">TV Digital</span>
              </div>
              <p className="text-gray-100">Tu canal de noticias locales y nacionales de confianza.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Secciones</h3>
              <ul className="space-y-2 text-gray-100">
                <li><a href="#" className="hover:text-white">Noticias Locales</a></li>
                <li><a href="#" className="hover:text-white">Deportes</a></li>
                <li><a href="#" className="hover:text-white">Cultura</a></li>
                <li><a href="#" className="hover:text-white">Economía</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-100">
                <li>Email: contacto@7matv.com</li>
                <li>Teléfono: (123) 456-7890</li>
                <li>Dirección: Calle Principal 123</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-red-600 mt-8 pt-8 text-center text-sm text-gray-100">
            <p>© 2024 7MA TV Digital. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;