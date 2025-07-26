export interface SearchConfig {
  keys: string[];
  threshold: number;
  includeScore: boolean;
}

export const defaultSearchConfig: SearchConfig = {
  keys: ['title', 'category', 'introduction', 'items.name'],
  threshold: 0.4,
  includeScore: true
};

export function highlightSearchTerm(text: string, searchTerm: string): string {
  if (!searchTerm.trim()) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

export function normalizeSearchQuery(query: string): string {
  return query.toLowerCase().trim().replace(/\s+/g, ' ');
}
