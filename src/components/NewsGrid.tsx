import React from 'react';
import { NewsItem } from '../types/news';

interface NewsGridProps {
  news: NewsItem[];
}

export function NewsGrid({ news }: NewsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {news.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <img 
            src={item.imageUrl || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=400'} 
            alt={item.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-red-700 font-semibold">{item.category}</span>
              <span className="text-xs text-gray-500">{item.source}</span>
            </div>
            <h3 className="text-lg font-bold mt-2 hover:text-red-700">{item.title}</h3>
            <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-4 text-red-700 hover:text-red-800 text-sm font-semibold"
            >
              Leer más →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}