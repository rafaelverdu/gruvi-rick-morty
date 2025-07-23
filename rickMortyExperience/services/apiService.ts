import { 
  ApiResponse, 
  Character, 
  Location, 
  Episode, 
  CharactersQueryParams, 
  LocationsQueryParams, 
  EpisodesQueryParams 
} from '../interface/api';

const BASE_URL = 'https://rickandmortyapi.com/api';

// Helper function to build query string
const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  });
  return searchParams.toString();
};

// Characters API
export const charactersApi = {
  getAll: async (params?: CharactersQueryParams): Promise<ApiResponse<Character>> => {
    const queryString = params ? `?${buildQueryString(params)}` : '';
    const response = await fetch(`${BASE_URL}/character${queryString}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch characters: ${response.status}`);
    }
    
    return response.json();
  },

  getById: async (id: number): Promise<Character> => {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch character ${id}: ${response.status}`);
    }
    
    return response.json();
  },

  getMultiple: async (ids: number[]): Promise<Character[]> => {
    const response = await fetch(`${BASE_URL}/character/${ids.join(',')}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch characters: ${response.status}`);
    }
    
    return response.json();
  }
};

// Locations API
export const locationsApi = {
  getAll: async (params?: LocationsQueryParams): Promise<ApiResponse<Location>> => {
    const queryString = params ? `?${buildQueryString(params)}` : '';
    const response = await fetch(`${BASE_URL}/location${queryString}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.status}`);
    }
    
    return response.json();
  },

  getById: async (id: number): Promise<Location> => {
    const response = await fetch(`${BASE_URL}/location/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch location ${id}: ${response.status}`);
    }
    
    return response.json();
  },

  getMultiple: async (ids: number[]): Promise<Location[]> => {
    const response = await fetch(`${BASE_URL}/location/${ids.join(',')}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.status}`);
    }
    
    return response.json();
  }
};

// Episodes API
export const episodesApi = {
  getAll: async (params?: EpisodesQueryParams): Promise<ApiResponse<Episode>> => {
    const queryString = params ? `?${buildQueryString(params)}` : '';
    const response = await fetch(`${BASE_URL}/episode${queryString}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch episodes: ${response.status}`);
    }
    
    return response.json();
  },

  getById: async (id: number): Promise<Episode> => {
    const response = await fetch(`${BASE_URL}/episode/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch episode ${id}: ${response.status}`);
    }
    
    return response.json();
  },

  getMultiple: async (ids: number[]): Promise<Episode[]> => {
    const response = await fetch(`${BASE_URL}/episode/${ids.join(',')}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch episodes: ${response.status}`);
    }
    
    return response.json();
  }
}; 