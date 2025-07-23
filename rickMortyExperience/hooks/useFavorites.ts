import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { databaseService } from '../services/database';
import { useEpisodesByIds } from './useEpisodes';

// Query Keys
export const favoriteKeys = {
  all: ['favorites'] as const,
  lists: () => [...favoriteKeys.all, 'list'] as const,
  details: () => [...favoriteKeys.all, 'detail'] as const,
  detail: (id: number) => [...favoriteKeys.details(), id] as const,
  count: () => [...favoriteKeys.all, 'count'] as const,
};

// Get favorite episode IDs
export const useFavoriteEpisodeIds = () => {
  return useQuery({
    queryKey: favoriteKeys.lists(),
    queryFn: () => databaseService.getFavoriteEpisodeIds(),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get favorite episodes with full data
export const useFavoriteEpisodes = () => {
  const { data: favoriteIds, isLoading: isLoadingIds } = useFavoriteEpisodeIds();
  
  const { data: episodes, isLoading: isLoadingEpisodes } = useEpisodesByIds(
    favoriteIds || []
  );

  // If there are no favorite IDs, return empty array
  // If there are favorite IDs but episodes is undefined (query disabled), return empty array
  const safeEpisodes = !favoriteIds || favoriteIds.length === 0 || !episodes ? [] : episodes;
  const safeFavoriteIds = Array.isArray(favoriteIds) ? favoriteIds : [];

  return {
    data: safeEpisodes,
    isLoading: isLoadingIds || (favoriteIds && favoriteIds.length > 0 && isLoadingEpisodes),
    favoriteIds: safeFavoriteIds,
  };
};

// Check if episode is favorite
export const useIsFavorite = (episodeId: number) => {
  return useQuery({
    queryKey: favoriteKeys.detail(episodeId),
    queryFn: () => databaseService.isFavorite(episodeId),
    enabled: !!episodeId,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Get favorites count
export const useFavoritesCount = () => {
  return useQuery({
    queryKey: favoriteKeys.count(),
    queryFn: () => databaseService.getFavoritesCount(),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Add to favorites mutation
export const useAddToFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (episodeId: number) => databaseService.addToFavorites(episodeId),
    onSuccess: (_, episodeId) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: favoriteKeys.lists() });
      queryClient.invalidateQueries({ queryKey: favoriteKeys.count() });
      queryClient.invalidateQueries({ queryKey: favoriteKeys.detail(episodeId) });
      
      // Optimistically update the isFavorite query
      queryClient.setQueryData(favoriteKeys.detail(episodeId), true);
    },
    onError: (error, episodeId) => {
      console.error(`Failed to add episode ${episodeId} to favorites:`, error);
    },
  });
};

// Remove from favorites mutation
export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (episodeId: number) => databaseService.removeFromFavorites(episodeId),
    onSuccess: (_, episodeId) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: favoriteKeys.lists() });
      queryClient.invalidateQueries({ queryKey: favoriteKeys.count() });
      queryClient.invalidateQueries({ queryKey: favoriteKeys.detail(episodeId) });
      
      // Optimistically update the isFavorite query
      queryClient.setQueryData(favoriteKeys.detail(episodeId), false);
    },
    onError: (error, episodeId) => {
      console.error(`Failed to remove episode ${episodeId} from favorites:`, error);
    },
  });
};

// Toggle favorite status
export const useToggleFavorite = () => {
  const addMutation = useAddToFavorites();
  const removeMutation = useRemoveFromFavorites();

  return {
    toggleFavorite: (episodeId: number, isCurrentlyFavorite: boolean) => {
      if (isCurrentlyFavorite) {
        removeMutation.mutate(episodeId);
      } else {
        addMutation.mutate(episodeId);
      }
    },
    isLoading: addMutation.isPending || removeMutation.isPending,
  };
};

// Clear all favorites mutation
export const useClearAllFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => databaseService.clearAllFavorites(),
    onSuccess: () => {
      // Invalidate all favorite-related queries
      queryClient.invalidateQueries({ queryKey: favoriteKeys.all });
    },
    onError: (error) => {
      console.error('Failed to clear all favorites:', error);
    },
  });
}; 