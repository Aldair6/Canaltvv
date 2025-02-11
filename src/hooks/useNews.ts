import { useState, useEffect } from 'react';
import { NewsItem } from '../types/news';

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNews() {
      try {
        const response = await fetch('/src/data/news.json');
        if (!response.ok) {
          throw new Error('Failed to load news');
        }
        const data = await response.json();
        setNews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading news');
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  return { news, loading, error };
}