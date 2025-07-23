import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { LocationsUseCase } from '../services/useCases';
import { LocationsQueryParams, Location, ApiResponse } from '../interface/api';

// Query Keys
export const locationKeys = {
  all: ['locations'] as const,
  lists: () => [...locationKeys.all, 'list'] as const,
  list: (filters: LocationsQueryParams) => [...locationKeys.lists(), filters] as const,
  details: () => [...locationKeys.all, 'detail'] as const,
  detail: (id: number) => [...locationKeys.details(), id] as const,
  multiple: (ids: number[]) => [...locationKeys.details(), 'multiple', ids] as const,
};

// Get all locations with pagination
export const useLocations = (params?: LocationsQueryParams) => {
  return useQuery({
    queryKey: locationKeys.list(params || {}),
    queryFn: () => LocationsUseCase.getAllLocations(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get locations with infinite scroll
export const useInfiniteLocations = (params?: Omit<LocationsQueryParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: locationKeys.list(params || {}),
    queryFn: ({ pageParam = 1 }) => 
      LocationsUseCase.getAllLocations({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ApiResponse<Location>) => {
      return lastPage.info.next ? lastPage.info.pages + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get location by ID
export const useLocation = (id: number) => {
  return useQuery({
    queryKey: locationKeys.detail(id),
    queryFn: () => LocationsUseCase.getLocationById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Get multiple locations by IDs
export const useLocationsByIds = (ids: number[]) => {
  return useQuery({
    queryKey: locationKeys.multiple(ids),
    queryFn: () => LocationsUseCase.getLocationsByIds(ids),
    enabled: ids.length > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Search locations by name
export const useSearchLocations = (name: string) => {
  return useQuery({
    queryKey: locationKeys.list({ name }),
    queryFn: () => LocationsUseCase.searchLocationsByName(name),
    enabled: !!name && name.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get locations by type
export const useLocationsByType = (type: string) => {
  return useQuery({
    queryKey: locationKeys.list({ type }),
    queryFn: () => LocationsUseCase.getLocationsByType(type),
    enabled: !!type,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get locations by dimension
export const useLocationsByDimension = (dimension: string) => {
  return useQuery({
    queryKey: locationKeys.list({ dimension }),
    queryFn: () => LocationsUseCase.getLocationsByDimension(dimension),
    enabled: !!dimension,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}; 