import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { CharactersUseCase } from '../services/useCases';
import { CharactersQueryParams, Character, ApiResponse } from '../interface/api';

// Query Keys
export const characterKeys = {
  all: ['characters'] as const,
  lists: () => [...characterKeys.all, 'list'] as const,
  list: (filters: CharactersQueryParams) => [...characterKeys.lists(), filters] as const,
  details: () => [...characterKeys.all, 'detail'] as const,
  detail: (id: number) => [...characterKeys.details(), id] as const,
  multiple: (ids: number[]) => [...characterKeys.details(), 'multiple', ids] as const,
};

// Get all characters with pagination
export const useCharacters = (params?: CharactersQueryParams) => {
  return useQuery({
    queryKey: characterKeys.list(params || {}),
    queryFn: () => CharactersUseCase.getAllCharacters(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get characters with infinite scroll
export const useInfiniteCharacters = (params?: Omit<CharactersQueryParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: characterKeys.list(params || {}),
    queryFn: ({ pageParam = 1 }) => 
      CharactersUseCase.getAllCharacters({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ApiResponse<Character>) => {
      return lastPage.info.next ? lastPage.info.pages + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get character by ID
export const useCharacter = (id: number) => {
  return useQuery({
    queryKey: characterKeys.detail(id),
    queryFn: () => CharactersUseCase.getCharacterById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Get multiple characters by IDs
export const useCharactersByIds = (ids: number[]) => {
  return useQuery({
    queryKey: characterKeys.multiple(ids),
    queryFn: () => CharactersUseCase.getCharactersByIds(ids),
    enabled: ids.length > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Search characters by name
export const useSearchCharacters = (name: string) => {
  return useQuery({
    queryKey: characterKeys.list({ name }),
    queryFn: () => CharactersUseCase.searchCharactersByName(name),
    enabled: !!name && name.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get characters by status
export const useCharactersByStatus = (status: 'alive' | 'dead' | 'unknown') => {
  return useQuery({
    queryKey: characterKeys.list({ status }),
    queryFn: () => CharactersUseCase.getCharactersByStatus(status),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get characters by species
export const useCharactersBySpecies = (species: string) => {
  return useQuery({
    queryKey: characterKeys.list({ species }),
    queryFn: () => CharactersUseCase.getCharactersBySpecies(species),
    enabled: !!species,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get characters by gender
export const useCharactersByGender = (gender: 'female' | 'male' | 'genderless' | 'unknown') => {
  return useQuery({
    queryKey: characterKeys.list({ gender }),
    queryFn: () => CharactersUseCase.getCharactersByGender(gender),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}; 