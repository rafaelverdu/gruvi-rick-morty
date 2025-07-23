import React from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import { episodesStyles } from "../styles/episodes";
import { Ionicons } from "@expo/vector-icons";
import { Episode } from "../interface/api";
import { useIsFavorite, useToggleFavorite } from "../hooks/useFavorites";
import { EpisodeRating } from "./EpisodeRating";

interface EpisodesListProps {
  episode: Episode;
  showFavoriteButton?: boolean;
  showRating?: boolean;
  onRatingChange?: (episodeId: number, score: number) => void;
  currentScore?: number | null;
  isRatingLoading?: boolean;
}

export function EpisodesList({ 
  episode, 
  showFavoriteButton = true,
  showRating = false,
  onRatingChange,
  currentScore,
  isRatingLoading = false
}: EpisodesListProps) {
  const { data: isFavorite, isLoading: isLoadingFavorite } = useIsFavorite(episode.id);
  const { toggleFavorite, isLoading: isToggling } = useToggleFavorite();

  const handleHeartPress = () => {
    if (!isToggling && !isLoadingFavorite) {
      toggleFavorite(episode.id, isFavorite || false);
    }
  };

  const getHeartIcon = () => {
    if (isLoadingFavorite || isToggling) {
      return <Ionicons name="heart" size={20} color="#666666" />; // Grey for loading/toggling
    }
    if (isFavorite) {
      return <Ionicons name="heart" size={20} color="#ff6b6b" />; // Red for favorited
    }
    return <Ionicons name="heart-outline" size={20} color="#666666" />; // Outline for not favorited
  };

  return (
    <View key={episode.id} style={episodesStyles.episodeCard}>
      <View style={episodesStyles.episodeHeader}>
        <Text style={episodesStyles.episodeNumber}>{episode.episode}</Text>
        {showFavoriteButton && (
          <TouchableOpacity
            onPress={handleHeartPress}
            disabled={isToggling || isLoadingFavorite}
            style={{ padding: 4 }}
          >
            {getHeartIcon()}
          </TouchableOpacity>
        )}
      </View>
      <Text style={episodesStyles.episodeName}>{episode.name}</Text>
      <Text style={episodesStyles.airDate}>{episode.air_date}</Text>
      
      {showRating && onRatingChange && (
        <EpisodeRating
          episodeId={episode.id}
          currentScore={currentScore || null}
          onRatingChange={onRatingChange}
          isLoading={isRatingLoading}
        />
      )}
    </View>
  );
}