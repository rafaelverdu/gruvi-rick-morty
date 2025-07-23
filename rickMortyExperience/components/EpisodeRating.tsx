import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EpisodeRatingProps {
  episodeId: number;
  currentScore: number | null;
  onRatingChange: (episodeId: number, score: number) => void;
  isLoading?: boolean;
}

export function EpisodeRating({ 
  episodeId, 
  currentScore, 
  onRatingChange, 
  isLoading = false 
}: EpisodeRatingProps) {
  const handleStarPress = (score: number) => {
    if (!isLoading) {
      onRatingChange(episodeId, score);
    }
  };

  const renderStar = (starNumber: number) => {
    const isFilled = currentScore !== null && starNumber <= currentScore;
    const isHalf = currentScore !== null && starNumber === Math.ceil(currentScore) && currentScore % 1 !== 0;
    
    let iconName = 'star-outline';
    if (isFilled) {
      iconName = 'star';
    } else if (isHalf) {
      iconName = 'star-half';
    }

    return (
      <TouchableOpacity
        key={starNumber}
        onPress={() => handleStarPress(starNumber)}
        disabled={isLoading}
        style={styles.starButton}
      >
        <Ionicons 
          name={iconName as any} 
          size={20} 
          color={isFilled || isHalf ? '#ffd700' : '#666666'} 
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rating:</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map(renderStar)}
      </View>
      {currentScore !== null && (
        <Text style={styles.scoreText}>{currentScore}/5</Text>
      )}
      {isLoading && (
        <Text style={styles.loadingText}>Saving...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  label: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starButton: {
    padding: 2,
  },
  scoreText: {
    color: '#ffd700',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
  },
  loadingText: {
    color: '#00ff00',
    fontSize: 12,
    marginLeft: 8,
  },
}); 