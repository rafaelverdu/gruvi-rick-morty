import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EpisodeFilterProps {
  onSearch: (query: string) => void;
  onSeasonFilter: (season: string) => void;
  onClearFilters: () => void;
  currentSearch: string;
  currentSeason: string;
}

export function EpisodeFilter({ 
  onSearch, 
  onSeasonFilter, 
  onClearFilters, 
  currentSearch, 
  currentSeason 
}: EpisodeFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const seasons = [
    { label: 'All Seasons', value: '' },
    { label: 'Season 1', value: 'S01' },
    { label: 'Season 2', value: 'S02' },
    { label: 'Season 3', value: 'S03' },
    { label: 'Season 4', value: 'S04' },
    { label: 'Season 5', value: 'S05' },
    { label: 'Season 6', value: 'S06' },
    { label: 'Season 7', value: 'S07' },
  ];

  const hasActiveFilters = currentSearch.length > 0 || currentSeason.length > 0;

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search episodes..."
          placeholderTextColor="#666666"
          value={currentSearch}
          onChangeText={onSearch}
        />
        {currentSearch.length > 0 && (
          <TouchableOpacity onPress={() => onSearch('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#666666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Toggle */}
      <View style={styles.filterHeader}>
        <TouchableOpacity 
          style={styles.filterToggle} 
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <Ionicons name="filter" size={20} color="#00ff00" />
          <Text style={styles.filterText}>Filters</Text>
          <Ionicons 
            name={isExpanded ? "chevron-up" : "chevron-down"} 
            size={16} 
            color="#00ff00" 
          />
        </TouchableOpacity>

        {hasActiveFilters && (
          <TouchableOpacity onPress={onClearFilters} style={styles.clearFiltersButton}>
            <Text style={styles.clearFiltersText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Options */}
      {isExpanded && (
        <View style={styles.filterOptions}>
          <Text style={styles.filterLabel}>Season:</Text>
          <View style={styles.seasonButtons}>
            {seasons.map((season) => (
              <TouchableOpacity
                key={season.value}
                style={[
                  styles.seasonButton,
                  currentSeason === season.value && styles.seasonButtonActive
                ]}
                onPress={() => onSeasonFilter(season.value)}
              >
                <Text style={[
                  styles.seasonButtonText,
                  currentSeason === season.value && styles.seasonButtonTextActive
                ]}>
                  {season.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <View style={styles.activeFilters}>
          {currentSearch.length > 0 && (
            <View style={styles.activeFilterTag}>
                             <Text style={styles.activeFilterText}>&quot;{currentSearch}&quot;</Text>
              <TouchableOpacity onPress={() => onSearch('')}>
                <Ionicons name="close" size={14} color="#ffffff" />
              </TouchableOpacity>
            </View>
          )}
          {currentSeason.length > 0 && (
            <View style={styles.activeFilterTag}>
              <Text style={styles.activeFilterText}>
                {seasons.find(s => s.value === currentSeason)?.label}
              </Text>
              <TouchableOpacity onPress={() => onSeasonFilter('')}>
                <Ionicons name="close" size={14} color="#ffffff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    paddingVertical: 12,
  },
  clearButton: {
    padding: 4,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  filterText: {
    color: '#00ff00',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    marginRight: 4,
  },
  clearFiltersButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  clearFiltersText: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: '500',
  },
  filterOptions: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  filterLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  seasonButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  seasonButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#333333',
  },
  seasonButtonActive: {
    backgroundColor: '#00ff00',
    borderColor: '#00ff00',
  },
  seasonButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  seasonButtonTextActive: {
    color: '#000000',
  },
  activeFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  activeFilterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00ff00',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  activeFilterText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
  },
}); 