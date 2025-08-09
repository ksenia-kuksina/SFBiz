import { SearchFilters } from './api';

// URL management for search filters
export function updateSearchParams(filters: SearchFilters, replace = false) {
  const url = new URL(window.location.href);

  // Clear existing search params
  url.searchParams.delete('q');
  url.searchParams.delete('category');
  url.searchParams.delete('location');
  url.searchParams.delete('minRating');
  url.searchParams.delete('maxRating');
  url.searchParams.delete('sortBy');
  url.searchParams.delete('sortOrder');
  url.searchParams.delete('page');

  // Add new params
  if (filters.q) url.searchParams.set('q', filters.q);
  if (filters.category?.length) url.searchParams.set('category', filters.category.join(','));
  if (filters.location?.length) url.searchParams.set('location', filters.location.join(','));
  if (filters.minRating) url.searchParams.set('minRating', filters.minRating.toString());
  if (filters.maxRating) url.searchParams.set('maxRating', filters.maxRating.toString());
  if (filters.sortBy) url.searchParams.set('sortBy', filters.sortBy);
  if (filters.sortOrder) url.searchParams.set('sortOrder', filters.sortOrder);
  if (filters.page && filters.page > 1) url.searchParams.set('page', filters.page.toString());

  if (replace) {
    window.history.replaceState({}, '', url.toString());
  } else {
    window.history.pushState({}, '', url.toString());
  }
}

export function parseSearchParams(): SearchFilters {
  const url = new URL(window.location.href);

  return {
    q: url.searchParams.get('q') || undefined,
    category: url.searchParams.get('category')?.split(',').filter(Boolean) || undefined,
    location: url.searchParams.get('location')?.split(',').filter(Boolean) || undefined,
    minRating: url.searchParams.get('minRating') ? Number(url.searchParams.get('minRating')) : undefined,
    maxRating: url.searchParams.get('maxRating') ? Number(url.searchParams.get('maxRating')) : undefined,
    sortBy: url.searchParams.get('sortBy') as SearchFilters['sortBy'] || undefined,
    sortOrder: url.searchParams.get('sortOrder') as SearchFilters['sortOrder'] || undefined,
    page: url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1,
    limit: 12,
  };
}

// Debounce utility
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Format distance
export function formatDistance(distance?: number): string {
  if (!distance) return '';
  if (distance < 1) return `${Math.round(distance * 1000)}m`;
  return `${distance.toFixed(1)}km`;
}

// Format rating
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

// Get rating color
export function getRatingColor(rating: number): string {
  if (rating >= 4.5) return 'text-green-500';
  if (rating >= 4.0) return 'text-blue-500';
  if (rating >= 3.5) return 'text-yellow-500';
  if (rating >= 3.0) return 'text-orange-500';
  return 'text-red-500';
}

// Get category icon
export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'Restaurants & Cafes': '🍽️',
    'Health & Fitness': '💪',
    'Beauty & Wellness': '💄',
    'Shopping & Retail': '🛍️',
    'Entertainment': '🎭',
    'Professional Services': '💼',
    'Home & Garden': '🏠',
    'Automotive': '🚗',
    'Education': '📚',
    'Technology': '💻',
    'Real Estate': '🏢',
    'Travel & Tourism': '✈️',
    'Sports & Recreation': '⚽',
    'Arts & Culture': '🎨',
    'Other': '🏪',
  };

  return icons[category] || '🏪';
}

// Get location icon - removed unused parameter
export function getLocationIcon(): string {
  return '📍';
}

// Define expected structure for a business object
type Business = {
  name: string;
  category: string;
  location: string;
};

// Generate search suggestions based on query
export function generateSuggestions(query: string, businesses: Business[]): string[] {
  if (!query.trim()) return [];

  const suggestions = new Set<string>();
  const lowerQuery = query.toLowerCase();

  businesses.forEach((business) => {
    if (business.name.toLowerCase().includes(lowerQuery)) {
      suggestions.add(business.name);
    }
  });

  const categories = [...new Set(businesses.map((b) => b.category))];
  categories.forEach((category) => {
    if (category.toLowerCase().includes(lowerQuery)) {
      suggestions.add(category);
    }
  });

  const locations = [...new Set(businesses.map((b) => b.location))];
  locations.forEach((location) => {
    if (location.toLowerCase().includes(lowerQuery)) {
      suggestions.add(location);
    }
  });

  return Array.from(suggestions).slice(0, 5);
}