const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Review Types
export interface ReviewFormData {
  businessId: number;
  name?: string;
  rating: number;
  text: string;
}

export interface Review {
  id: number;
  businessId: number;
  name?: string;
  rating: number;
  text: string;
  createdAt: string;
}

export interface ReviewsResponse {
  reviews: Review[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface AverageRatingResponse {
  averageRating: number;
  totalReviews: number;
  businessId: number;
}

// AI Recommendations types
export interface SocialLinks {
  [platform: string]: string;
}

export interface ServiceRecommendation {
  service_name: string;
  description: string;
  category: string;
  estimated_price_range: string;
  reasoning: string;
}

export interface AIRecommendationsResponse {
  recommendations: ServiceRecommendation[];
  business_info: {
    name: string;
    category: string;
    description: string;
    services: string;
    location: string;
    socials: SocialLinks;
  };
}

// Search types
export interface SearchFilters {
  q?: string;
  category?: string[];
  location?: string[];
  minRating?: number;
  maxRating?: number;
  sortBy?: 'name' | 'rating' | 'recent' | 'distance';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface SearchResult {
  id: number;
  name: string;
  category: string;
  description: string;
  services: string;
  image_url: string;
  rating: number;
  location: string;
  latitude?: number;
  longitude?: number;
  totalReviews: number;
  distance?: number;
}

export interface SearchResponse {
  businesses: SearchResult[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  filters: {
    categories: string[];
    locations: string[];
    ratingRange: {
      min: number;
      max: number;
    };
  };
  suggestions?: string[];
}

export interface SearchSuggestion {
  id: string;
  type: 'business' | 'category' | 'location';
  text: string;
  count?: number;
}

export interface SearchSuggestionsResponse {
  suggestions: SearchSuggestion[];
}

export const reviewsApi = {
  async checkBusinessOwner(businessId: number, token?: string): Promise<{ isOwner: boolean }> {
    if (!token) return { isOwner: false };

    const response = await fetch(`${API_BASE}/businesses/${businessId}/owner-check`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    });

    if (!response.ok) return { isOwner: false };

    return response.json();
  },

  async createReview(data: ReviewFormData, token?: string): Promise<Review> {
    if (!token) throw new Error("Authentication required");

    const response = await fetch(`${API_BASE}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create review");
    }

    return response.json();
  },

  async getBusinessReviews(businessId: number, page = 1, limit = 10): Promise<ReviewsResponse> {
    const response = await fetch(`${API_BASE}/reviews/${businessId}?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error("Failed to fetch reviews");
    return response.json();
  },

  async getBusinessAverageRating(businessId: number): Promise<AverageRatingResponse> {
    const response = await fetch(`${API_BASE}/reviews/average/${businessId}`);
    if (!response.ok) throw new Error("Failed to fetch average rating");
    return response.json();
  },
};

export const aiApi = {
  async getServiceRecommendations(businessId: number, token?: string): Promise<AIRecommendationsResponse> {
    if (!token) throw new Error("Authentication required");

    const response = await fetch(`${API_BASE}/businesses/${businessId}/ai-recommendations`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to get AI recommendations");
    }

    return response.json();
  },
};

// Pricing Types
export interface SeasonalAdjustments {
  summer: number;
  winter: number;
  holidays: number;
}

export interface ServicePricing {
  service_name: string;
  current_price_range: string;
  recommended_price_range: string;
  pricing_strategy: string;
  reasoning: string;
}

export interface DynamicPricing {
  base_multiplier: number;
  peak_hours_multiplier: number;
  off_peak_multiplier: number;
  weekend_multiplier: number;
  seasonal_adjustments: SeasonalAdjustments;
}

export interface CompetitivePositioning {
  target_position: string;
  price_advantage: string;
  value_proposition: string;
}

export interface RevenueOptimization {
  estimated_revenue_increase: string;
  key_strategies: string[];
  implementation_timeline: string;
}

export interface PricingAnalysis {
  service_pricing: ServicePricing[];
  dynamic_pricing: DynamicPricing;
  competitive_positioning: CompetitivePositioning;
  revenue_optimization: RevenueOptimization;
}

export interface MarketData {
  category: string;
  location: string;
  market_size: string;
  demand_trends: string;
  seasonal_factors: Record<string, unknown>;
  economic_indicators: Record<string, unknown>;
  growth_rate: number;
}

export interface CompetitorData {
  name: string;
  category: string;
  location: string;
  pricing_strategy: string;
  price_range: string;
  market_share: number;
  rating: number;
}

export interface PricingAnalysisResponse {
  pricing_analysis: PricingAnalysis;
  market_data: MarketData;
  competitor_data: CompetitorData[];
  business_info: Record<string, unknown>;
}

export interface DynamicPricingConfig {
  enabled: boolean;
  base_price_adjustment: number;
  demand_multiplier: number;
  seasonal_adjustments: SeasonalAdjustments;
  competitor_tracking: boolean;
  auto_adjust: boolean;
  min_price: number;
  max_price: number;
  update_frequency: string;
}

export interface PriceHistoryEntry {
  date: string;
  price: number;
  demand: number;
  revenue: number;
}

export interface PriceTrends {
  price_trend: string;
  revenue_trend: string;
  price_volatility: number;
  optimal_price_range: string;
  revenue_optimization: string;
}

export interface PriceHistoryResponse {
  business_name: string;
  category: string;
  price_history: PriceHistoryEntry[];
  trends: PriceTrends;
}

export interface PriceComparisonData {
  name: string;
  category: string;
  location: string;
  current_pricing: Record<string, unknown>;
  pricing_strategy: string;
}

export interface MarketAverage {
  average_price: number;
  price_range: string;
  market_position: string;
}

export interface PriceComparisonResponse {
  category: string;
  location: string;
  comparison_data: PriceComparisonData[];
  market_average: MarketAverage;
  business_context?: {
    business_name: string;
    business_rating: number;
    business_reviews: number;
    market_position: string;
  };
  personalized_insights?: {
    competitive_position: string;
    market_share: string;
    average_competitor_rating: number;
    rating_difference: number;
    competitor_count: number;
    market_opportunity: string;
  };
}

export const pricingApi = {
  async getPricingAnalysis(businessId: number, token?: string): Promise<PricingAnalysisResponse> {
    if (!token) throw new Error("Authentication required");

    const response = await fetch(`${API_BASE}/businesses/${businessId}/pricing-analysis`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to get pricing analysis");
    }

    return response.json();
  },

  async setDynamicPricing(businessId: number, config: DynamicPricingConfig, token?: string): Promise<{ message: string; config: DynamicPricingConfig }> {
    if (!token) throw new Error("Authentication required");

    const response = await fetch(`${API_BASE}/businesses/${businessId}/dynamic-pricing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to set dynamic pricing");
    }

    return response.json();
  },

  async getPriceHistory(businessId: number): Promise<PriceHistoryResponse> {
    const response = await fetch(`${API_BASE}/businesses/${businessId}/price-history`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to get price history");
    }
    return response.json();
  },

  async getPriceComparison(category: string, location: string, businessId?: number): Promise<PriceComparisonResponse> {
    const params = new URLSearchParams({ category, location });
    if (businessId) params.append('business_id', businessId.toString());

    const response = await fetch(`${API_BASE}/market/price-comparison?${params.toString()}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to get price comparison");
    }
    return response.json();
  },
};

export const searchApi = {
  async searchBusinesses(filters: SearchFilters): Promise<SearchResponse> {
    const params = new URLSearchParams();

    if (filters.q) params.append('q', filters.q);
    if (filters.category?.length) params.append('category', filters.category.join(','));
    if (filters.location?.length) params.append('location', filters.location.join(','));
    if (filters.minRating) params.append('minRating', filters.minRating.toString());
    if (filters.maxRating) params.append('maxRating', filters.maxRating.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const response = await fetch(`${API_BASE}/businesses/search?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to search businesses");
    return response.json();
  },

  async getSearchSuggestions(query: string): Promise<SearchSuggestionsResponse> {
    const response = await fetch(`${API_BASE}/search-suggestions?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Failed to fetch search suggestions");
    return response.json();
  },

  async getAllBusinesses(): Promise<SearchResult[]> {
    const response = await fetch(`${API_BASE}/businesses`);
    if (!response.ok) throw new Error("Failed to fetch businesses");
    return response.json();
  },

  async getFilterOptions(): Promise<{
    categories: string[];
    locations: string[];
    ratingRange: { min: number; max: number };
  }> {
    const response = await fetch(`${API_BASE}/businesses/filter-options`);
    if (!response.ok) throw new Error("Failed to fetch filter options");
    return response.json();
  },
};
