# Rick and Morty API Integration

This directory contains the complete API integration layer for the Rick and Morty API using TanStack React Query.

## Structure

```
interface/
├── api.ts              # TypeScript interfaces for API responses
└── README.md           # This documentation

services/
├── apiService.ts       # API service layer with fetch functions
└── useCases.ts         # Business logic use cases

hooks/
├── useCharacters.ts    # TanStack Query hooks for characters
├── useLocations.ts     # TanStack Query hooks for locations
├── useEpisodes.ts      # TanStack Query hooks for episodes
└── index.ts           # Export all hooks
```

## API Endpoints

The integration covers all three main endpoints from the [Rick and Morty API](https://rickandmortyapi.com/api):

- **Characters**: `https://rickandmortyapi.com/api/character`
- **Locations**: `https://rickandmortyapi.com/api/location`
- **Episodes**: `https://rickandmortyapi.com/api/episode`

## Usage Examples

### Characters

```typescript
import { useCharacters, useCharacter, useSearchCharacters } from '../hooks';

// Get all characters
const { data, isLoading, error } = useCharacters();

// Get character by ID
const { data: character } = useCharacter(1);

// Search characters by name
const { data: searchResults } = useSearchCharacters('Rick');

// Get characters by status
const { data: aliveCharacters } = useCharactersByStatus('alive');
```

### Locations

```typescript
import { useLocations, useLocation, useSearchLocations } from '../hooks';

// Get all locations
const { data, isLoading, error } = useLocations();

// Get location by ID
const { data: location } = useLocation(1);

// Search locations by name
const { data: searchResults } = useSearchLocations('Earth');
```

### Episodes

```typescript
import { useEpisodes, useEpisode, useSearchEpisodes } from '../hooks';

// Get all episodes
const { data, isLoading, error } = useEpisodes();

// Get episode by ID
const { data: episode } = useEpisode(1);

// Search episodes by name
const { data: searchResults } = useSearchEpisodes('Pilot');
```

## Features

### Caching
- **Stale Time**: 5-10 minutes for most queries
- **Garbage Collection**: 10-15 minutes
- **Search Queries**: Shorter cache times (2-5 minutes)

### Infinite Queries
- Support for infinite scrolling with `useInfiniteCharacters`, `useInfiniteLocations`, `useInfiniteEpisodes`
- Automatic pagination handling

### Query Keys
- Structured query keys for efficient cache management
- Automatic cache invalidation and updates

### Error Handling
- Proper error handling with meaningful error messages
- Network error detection

### Type Safety
- Full TypeScript support
- Proper typing for all API responses and parameters

## Installation Required

Before using these hooks, install TanStack Query:

```bash
npm install @tanstack/react-query
# or
yarn add @tanstack/react-query
```

## Setup Query Client

In your app root, wrap your components with QueryClientProvider:

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app components */}
    </QueryClientProvider>
  );
}
```

## Available Hooks

### Characters
- `useCharacters(params?)` - Get all characters with pagination
- `useInfiniteCharacters(params?)` - Get characters with infinite scroll
- `useCharacter(id)` - Get character by ID
- `useCharactersByIds(ids)` - Get multiple characters by IDs
- `useSearchCharacters(name)` - Search characters by name
- `useCharactersByStatus(status)` - Get characters by status
- `useCharactersBySpecies(species)` - Get characters by species
- `useCharactersByGender(gender)` - Get characters by gender

### Locations
- `useLocations(params?)` - Get all locations with pagination
- `useInfiniteLocations(params?)` - Get locations with infinite scroll
- `useLocation(id)` - Get location by ID
- `useLocationsByIds(ids)` - Get multiple locations by IDs
- `useSearchLocations(name)` - Search locations by name
- `useLocationsByType(type)` - Get locations by type
- `useLocationsByDimension(dimension)` - Get locations by dimension

### Episodes
- `useEpisodes(params?)` - Get all episodes with pagination
- `useInfiniteEpisodes(params?)` - Get episodes with infinite scroll
- `useEpisode(id)` - Get episode by ID
- `useEpisodesByIds(ids)` - Get multiple episodes by IDs
- `useSearchEpisodes(name)` - Search episodes by name
- `useEpisodesBySeason(season)` - Get episodes by season
- `useEpisodesByEpisodeCode(episodeCode)` - Get episodes by episode code
```