import React, { useState, useMemo } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EpisodesList } from "../../components/episodes";
import { EpisodeFilter } from "../../components/EpisodeFilter";
import { episodesStyles } from "../../styles/episodes";
import { useEpisodes } from "../../hooks/useEpisodes";
import { Episode } from "../../interface/api";

export default function EpisodesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [seasonFilter, setSeasonFilter] = useState('');
  
  const { 
    data, 
    isLoading, 
    error 
  } = useEpisodes();

  const episodes = data?.results || [];

  // Filter episodes based on search query and season
  const filteredEpisodes = useMemo(() => {
    return episodes.filter((episode: Episode) => {
      const matchesSearch = searchQuery === '' || 
        episode.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSeason = seasonFilter === '' || 
        episode.episode.startsWith(seasonFilter);
      
      return matchesSearch && matchesSeason;
    });
  }, [episodes, searchQuery, seasonFilter]);

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

  if (isLoading) {
    return (
      <View style={[episodesStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text style={{ color: '#ffffff', marginTop: 16 }}>Loading episodes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[episodesStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Ionicons name="alert-circle" size={64} color="#ff6b6b" />
        <Text style={{ color: '#ffffff', marginTop: 16, textAlign: 'center' }}>
          Failed to load episodes
        </Text>
        <Text style={{ color: '#999999', marginTop: 8, textAlign: 'center' }}>
          Please check your connection and try again
        </Text>
      </View>
    );
  }

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

        {filteredEpisodes.length === 0 ? (
          <View style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center', 
            paddingVertical: 64 
          }}>
            <Ionicons name="search" size={64} color="#666666" />
            <Text style={{ color: '#ffffff', marginTop: 16, fontSize: 18, fontWeight: '600' }}>
              No episodes found
            </Text>
            <Text style={{ color: '#999999', marginTop: 8, textAlign: 'center' }}>
              Try adjusting your search or filters
            </Text>
          </View>
        ) : (
          filteredEpisodes.map((episode) => (
            <EpisodesList key={episode.id} episode={episode} />
          ))
        )}
      </ScrollView>
    </View>
  );
}