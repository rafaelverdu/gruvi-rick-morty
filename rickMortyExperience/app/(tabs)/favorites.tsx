import React from 'react';
import { Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EpisodesList } from "../../components/episodes";
import { favoritesStyles } from "../../styles/favorites";
import { useFavoriteEpisodes, useClearAllFavorites, useUpdateEpisodeScore } from "../../hooks/useFavorites";
import { Episode } from '../../interface/api';

export default function FavoritesScreen() {
  const { data: episodes = [], isLoading, favoriteIds = [], favoriteData = [] } = useFavoriteEpisodes();
  const clearAllMutation = useClearAllFavorites();
  const updateScoreMutation = useUpdateEpisodeScore();

  // Ensure we always have arrays
  const safeEpisodes = Array.isArray(episodes) ? episodes : [];
  const safeFavoriteIds = Array.isArray(favoriteIds) ? favoriteIds : [];
  const safeFavoriteData = Array.isArray(favoriteData) ? favoriteData : [];

  const handleClearAll = () => clearAllMutation.mutate();

  const handleRatingChange = (episodeId: number, score: number) => {
    updateScoreMutation.mutate({ episodeId, score });
  };

  const getEpisodeScore = (episodeId: number): number | null => {
    const favoriteItem = safeFavoriteData.find(item => item.episode_id === episodeId);
    return favoriteItem?.score || null;
  };

  const renderHeader = () => (
    <View style={favoritesStyles.header}>
      <Ionicons name="heart" size={32} color="#ff6b6b" />
      <Text style={favoritesStyles.title}>Favorite Episodes</Text>
      {safeFavoriteIds.length > 0 && (
        <TouchableOpacity
          onPress={handleClearAll}
          disabled={clearAllMutation.isPending}
          style={favoritesStyles.clearAllButton}
        >
          <Text style={favoritesStyles.clearAllText}>
            {clearAllMutation.isPending ? 'Clearing...' : 'Clear All'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (isLoading) {
    return (
      <View style={favoritesStyles.container}>
        <View style={favoritesStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={favoritesStyles.loadingText}>Loading favorites...</Text>
        </View>
      </View>
    );
  }

  if (safeEpisodes.length === 0) {
    return (
      <View style={favoritesStyles.container}>
        <ScrollView style={favoritesStyles.scrollView}>
          {renderHeader()}
          <View style={favoritesStyles.emptyContainer}>
            <Ionicons name="heart-outline" size={64} color="#666666" />
            <Text style={favoritesStyles.emptyTitle}>No Favorite Episodes</Text>
            <Text style={favoritesStyles.emptyText}>
              Start adding episodes to your favorites by tapping the heart icon!
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={favoritesStyles.container}>
      <ScrollView style={favoritesStyles.scrollView}>
        {renderHeader()}
        {safeEpisodes.map((episode: Episode) => (
          <EpisodesList
            key={episode.id}
            episode={episode}
            showFavoriteButton={true}
            showRating={true}
            onRatingChange={handleRatingChange}
            currentScore={getEpisodeScore(episode.id)}
            isRatingLoading={updateScoreMutation.isPending}
          />
        ))}
      </ScrollView>
    </View>
  );
}
