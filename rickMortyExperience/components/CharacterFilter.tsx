import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CharacterFilterProps {
  onSearch: (query: string) => void;
  onStatusFilter: (status: string) => void;
  onSpeciesFilter: (species: string) => void;
  onGenderFilter: (gender: string) => void;
  onClearFilters: () => void;
  currentSearch: string;
  currentStatus: string;
  currentSpecies: string;
  currentGender: string;
}

export function CharacterFilter({ 
  onSearch, 
  onStatusFilter, 
  onSpeciesFilter,
  onGenderFilter,
  onClearFilters, 
  currentSearch, 
  currentStatus,
  currentSpecies,
  currentGender
}: CharacterFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { label: 'All Status', value: '' },
    { label: 'Alive', value: 'alive' },
    { label: 'Dead', value: 'dead' },
    { label: 'Unknown', value: 'unknown' },
  ];

  const speciesOptions = [
    { label: 'All Species', value: '' },
    { label: 'Human', value: 'Human' },
    { label: 'Alien', value: 'Alien' },
    { label: 'Humanoid', value: 'Humanoid' },
    { label: 'Robot', value: 'Robot' },
    { label: 'Animal', value: 'Animal' },
    { label: 'Cronenberg', value: 'Cronenberg' },
    { label: 'Disease', value: 'Disease' },
    { label: 'Mythological Creature', value: 'Mythological Creature' },
    { label: 'Poopybutthole', value: 'Poopybutthole' },
  ];

  const genderOptions = [
    { label: 'All Genders', value: '' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Genderless', value: 'genderless' },
    { label: 'Unknown', value: 'unknown' },
  ];

  const hasActiveFilters = currentSearch.length > 0 || currentStatus.length > 0 || currentSpecies.length > 0 || currentGender.length > 0;

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search characters..."
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
          {/* Status Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Status:</Text>
            <View style={styles.filterButtons}>
              {statusOptions.map((status) => (
                <TouchableOpacity
                  key={status.value}
                  style={[
                    styles.filterButton,
                    currentStatus === status.value && styles.filterButtonActive
                  ]}
                  onPress={() => onStatusFilter(status.value)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    currentStatus === status.value && styles.filterButtonTextActive
                  ]}>
                    {status.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Species Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Species:</Text>
            <View style={styles.filterButtons}>
              {speciesOptions.map((species) => (
                <TouchableOpacity
                  key={species.value}
                  style={[
                    styles.filterButton,
                    currentSpecies === species.value && styles.filterButtonActive
                  ]}
                  onPress={() => onSpeciesFilter(species.value)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    currentSpecies === species.value && styles.filterButtonTextActive
                  ]}>
                    {species.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Gender Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Gender:</Text>
            <View style={styles.filterButtons}>
              {genderOptions.map((gender) => (
                <TouchableOpacity
                  key={gender.value}
                  style={[
                    styles.filterButton,
                    currentGender === gender.value && styles.filterButtonActive
                  ]}
                  onPress={() => onGenderFilter(gender.value)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    currentGender === gender.value && styles.filterButtonTextActive
                  ]}>
                    {gender.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
          {currentStatus.length > 0 && (
            <View style={styles.activeFilterTag}>
              <Text style={styles.activeFilterText}>
                {statusOptions.find(s => s.value === currentStatus)?.label}
              </Text>
              <TouchableOpacity onPress={() => onStatusFilter('')}>
                <Ionicons name="close" size={14} color="#ffffff" />
              </TouchableOpacity>
            </View>
          )}
          {currentSpecies.length > 0 && (
            <View style={styles.activeFilterTag}>
              <Text style={styles.activeFilterText}>
                {speciesOptions.find(s => s.value === currentSpecies)?.label}
              </Text>
              <TouchableOpacity onPress={() => onSpeciesFilter('')}>
                <Ionicons name="close" size={14} color="#ffffff" />
              </TouchableOpacity>
            </View>
          )}
          {currentGender.length > 0 && (
            <View style={styles.activeFilterTag}>
              <Text style={styles.activeFilterText}>
                {genderOptions.find(g => g.value === currentGender)?.label}
              </Text>
              <TouchableOpacity onPress={() => onGenderFilter('')}>
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
  filterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#333333',
  },
  filterButtonActive: {
    backgroundColor: '#00ff00',
    borderColor: '#00ff00',
  },
  filterButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  filterButtonTextActive: {
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