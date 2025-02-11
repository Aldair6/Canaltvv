import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

const NEWS_SOURCES = {
  'El Comercio': {
    url: 'https://elcomercio.pe/ultimas-noticias/',
    selectors: {
      articles: 'article.story-item',
      title: 'h2',
      description: '.story-item__content p',
      image: 'figure img',
      category: '.story-item__section'
    }
  },
  'RPP': {
    url: 'https://rpp.pe/noticias',
    selectors: {
      articles: 'article.flex',
      title: 'h2',
      description: 'p',
      image: 'img',
      category: '.category'
    }
  },
  'La República': {
    url: 'https://larepublica.pe/ultimas-noticias/',
    selectors: {
      articles: 'article',
      title: 'h2',
      description: '.description',
      image: 'img',
      category: '.category'
    }
  }
};

async function scrapeWebsite(source, config) {
  try {
    console.log(`Intentando obtener noticias de ${source}...`);
    const response = await axios.get(config.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const articles = [];

    $(config.selectors.articles).each((i, element) => {
      if (i < 10) {
        try {
          const $element = $(element);
          const title = $element.find(config.selectors.title).text().trim();
          const description = $element.find(config.selectors.description).text().trim();
          const url = $element.find('a').attr('href');
          let imageUrl = $element.find(config.selectors.image).attr('src') || 
                        $element.find(config.selectors.image).attr('data-src');
          const category = $element.find(config.selectors.category).text().trim();

          // Asegurarse de que la URL de la imagen sea absoluta
          if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = new URL(imageUrl, config.url).toString();
          }

          // Asegurarse de que la URL del artículo sea absoluta
          let fullUrl = url;
          if (url && !url.startsWith('http')) {
            fullUrl = new URL(url, config.url).toString();
          }

          if (title && (description || title)) {
            articles.push({
              title,
              description: description || title,
              url: fullUrl,
              imageUrl: imageUrl || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=400',
              source,
              category: category || 'General',
              publishedAt: new Date().toISOString()
            });
          }
        } catch (err) {
          console.error(`Error procesando artículo de ${source}:`, err.message);
        }
      }
    });

    console.log(`Se obtuvieron ${articles.length} artículos de ${source}`);
    return articles;
  } catch (error) {
    console.error(`Error obteniendo noticias de ${source}:`, error.message);
    return [];
  }
}

async function saveNews(news) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'news.json');
    await fs.writeFile(filePath, JSON.stringify(news, null, 2));
    console.log(`Noticias guardadas exitosamente: ${news.length} artículos en total`);
  } catch (error) {
    console.error('Error guardando noticias:', error);
  }
}

async function scrapeAllSources() {
  const allNews = [];
  
  for (const [source, config] of Object.entries(NEWS_SOURCES)) {
    const articles = await scrapeWebsite(source, config);
    allNews.push(...articles);
  }

  try {
    await fs.mkdir(path.join(process.cwd(), 'src', 'data'), { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      console.error('Error creando directorio de datos:', error);
    }
  }

  await saveNews(allNews);
}

// Ejecutar el scraper
scrapeAllSources();