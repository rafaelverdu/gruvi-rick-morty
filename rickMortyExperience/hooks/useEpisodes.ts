import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { EpisodesUseCase } from '../services/useCases';
import { EpisodesQueryParams, Episode, ApiResponse } from '../interface/api';

// Query Keys
export const episodeKeys = {
  all: ['episodes'] as const,
  lists: () => [...episodeKeys.all, 'list'] as const,
  list: (filters: EpisodesQueryParams) => [...episodeKeys.lists(), filters] as const,
  details: () => [...episodeKeys.all, 'detail'] as const,
  detail: (id: number) => [...episodeKeys.details(), id] as const,
  multiple: (ids: number[]) => [...episodeKeys.details(), 'multiple', ids] as const,
};

// Get all episodes with pagination
export const useEpisodes = (params?: EpisodesQueryParams) => {
  return useQuery({
    queryKey: episodeKeys.list(params || {}),
    queryFn: () => EpisodesUseCase.getAllEpisodes(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get episodes with infinite scroll
export const useInfiniteEpisodes = (params?: Omit<EpisodesQueryParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: episodeKeys.list(params || {}),
    queryFn: ({ pageParam = 1 }) => 
      EpisodesUseCase.getAllEpisodes({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ApiResponse<Episode>) => {
      return lastPage.info.next ? lastPage.info.pages + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get episode by ID
export const useEpisode = (id: number) => {
  return useQuery({
    queryKey: episodeKeys.detail(id),
    queryFn: () => EpisodesUseCase.getEpisodeById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Get multiple episodes by IDs
export const useEpisodesByIds = (ids: number[]) => {
  return useQuery({
    queryKey: episodeKeys.multiple(ids),
    queryFn: () => EpisodesUseCase.getEpisodesByIds(ids),
    enabled: ids.length > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Search episodes by name
export const useSearchEpisodes = (name: string) => {
  return useQuery({
    queryKey: episodeKeys.list({ name }),
    queryFn: () => EpisodesUseCase.searchEpisodesByName(name),
    enabled: !!name && name.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get episodes by season
export const useEpisodesBySeason = (season: string) => {
  return useQuery({
    queryKey: episodeKeys.list({ episode: season }),
    queryFn: () => EpisodesUseCase.getEpisodesBySeason(season),
    enabled: !!season,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get episodes by episode code
export const useEpisodesByEpisodeCode = (episodeCode: string) => {
  return useQuery({
    queryKey: episodeKeys.list({ episode: episodeCode }),
    queryFn: () => EpisodesUseCase.getEpisodesByEpisodeCode(episodeCode),
    enabled: !!episodeCode,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}; 