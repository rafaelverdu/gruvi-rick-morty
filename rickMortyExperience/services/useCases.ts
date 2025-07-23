import { 
  CharactersQueryParams, 
  LocationsQueryParams, 
  EpisodesQueryParams,
  Character,
  Location,
  Episode,
  ApiResponse
} from '../interface/api';
import { charactersApi, locationsApi, episodesApi } from './apiService';

// Characters Use Cases
export class CharactersUseCase {
  static async getAllCharacters(params?: CharactersQueryParams): Promise<ApiResponse<Character>> {
    return charactersApi.getAll(params);
  }

  static async getCharacterById(id: number): Promise<Character> {
    return charactersApi.getById(id);
  }

  static async getCharactersByIds(ids: number[]): Promise<Character[]> {
    return charactersApi.getMultiple(ids);
  }

  static async searchCharactersByName(name: string): Promise<ApiResponse<Character>> {
    return charactersApi.getAll({ name });
  }

  static async getCharactersByStatus(status: 'alive' | 'dead' | 'unknown'): Promise<ApiResponse<Character>> {
    return charactersApi.getAll({ status });
  }

  static async getCharactersBySpecies(species: string): Promise<ApiResponse<Character>> {
    return charactersApi.getAll({ species });
  }

  static async getCharactersByGender(gender: 'female' | 'male' | 'genderless' | 'unknown'): Promise<ApiResponse<Character>> {
    return charactersApi.getAll({ gender });
  }
}

// Locations Use Cases
export class LocationsUseCase {
  static async getAllLocations(params?: LocationsQueryParams): Promise<ApiResponse<Location>> {
    return locationsApi.getAll(params);
  }

  static async getLocationById(id: number): Promise<Location> {
    return locationsApi.getById(id);
  }

  static async getLocationsByIds(ids: number[]): Promise<Location[]> {
    return locationsApi.getMultiple(ids);
  }

  static async searchLocationsByName(name: string): Promise<ApiResponse<Location>> {
    return locationsApi.getAll({ name });
  }

  static async getLocationsByType(type: string): Promise<ApiResponse<Location>> {
    return locationsApi.getAll({ type });
  }

  static async getLocationsByDimension(dimension: string): Promise<ApiResponse<Location>> {
    return locationsApi.getAll({ dimension });
  }
}

// Episodes Use Cases
export class EpisodesUseCase {
  static async getAllEpisodes(params?: EpisodesQueryParams): Promise<ApiResponse<Episode>> {
    return episodesApi.getAll(params);
  }

  static async getEpisodeById(id: number): Promise<Episode> {
    return episodesApi.getById(id);
  }

  static async getEpisodesByIds(ids: number[]): Promise<Episode[]> {
    return episodesApi.getMultiple(ids);
  }

  static async searchEpisodesByName(name: string): Promise<ApiResponse<Episode>> {
    return episodesApi.getAll({ name });
  }

  static async getEpisodesBySeason(season: string): Promise<ApiResponse<Episode>> {
    return episodesApi.getAll({ episode: season });
  }

  static async getEpisodesByEpisodeCode(episodeCode: string): Promise<ApiResponse<Episode>> {
    return episodesApi.getAll({ episode: episodeCode });
  }
} 