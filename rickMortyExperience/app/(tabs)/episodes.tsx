import React, { useState, useMemo } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EpisodesList } from "../../components/episodes";
import { EpisodeFilter } from "../../components/EpisodeFilter";
import { episodesStyles } from "../../styles/episodes";
import { useEpisodes } from "../../hooks/useEpisodes";
import { Episode, EpisodesQueryParams } from "../../interface/api";
import { ErrorScreen } from '../../components/ErrorScreen';
import { LoadingScreen } from '../../components/LoadingScreen';

export default function EpisodesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [seasonFilter, setSeasonFilter] = useState('');
  
  // Build query parameters for API filtering
  const queryParams: EpisodesQueryParams = useMemo(() => {
    const params: EpisodesQueryParams = {};
    
    if (searchQuery.trim()) {
      params.name = searchQuery.trim();
    }
    
    if (seasonFilter) {
      params.episode = seasonFilter;
    }
    
    return params;
  }, [searchQuery, seasonFilter]);

  const { 
    data, 
    isLoading, 
    error 
  } = useEpisodes(queryParams);

  const episodes = data?.results || [];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSeasonFilter = (season: string) => {
    setSeasonFilter(season);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSeasonFilter('');
  };

  const renderHeader = () => (
    <View style={episodesStyles.header}>
      <Ionicons name="tv" size={32} color="#00ff00" />
      <Text style={episodesStyles.title}>Rick and Morty Episodes</Text>
    </View>
  );

  const renderContent = () => {
    if (error) {
      return (
        <ErrorScreen error={error} />
      );
    }

    if (isLoading && episodes.length === 0) {
      return (
        <LoadingScreen />
      );
    }

    if (episodes.length === 0) {
      return (
        <View style={episodesStyles.emptyContainer}>
          <Ionicons name="search" size={64} color="#666666" />
          <Text style={episodesStyles.emptyTitle}>No Episodes Found</Text>
          <Text style={episodesStyles.emptyText}>
            Try adjusting your search or filters
          </Text>
        </View>
      );
    }

    return (
      <>
        {isLoading && (
          <View style={episodesStyles.loadingOverlay}>
            <ActivityIndicator size="small" color="#00ff00" />
            <Text style={episodesStyles.loadingOverlayText}>Updating results...</Text>
          </View>
        )}
        {episodes.map((episode: Episode) => (
          <EpisodesList key={episode.id} episode={episode} />
        ))}
      </>
    );
  };

  return (
    <View style={episodesStyles.container}>
      <ScrollView style={episodesStyles.scrollView}>
        {renderHeader()}
        <EpisodeFilter
          onSearch={handleSearch}
          onSeasonFilter={handleSeasonFilter}
          onClearFilters={handleClearFilters}
          currentSearch={searchQuery}
          currentSeason={seasonFilter}
        />
        {renderContent()}
      </ScrollView>
    </View>
  );
}