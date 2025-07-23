import React, { useState, useMemo } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CharactersList } from "../../components/characters";
import { CharacterFilter } from "../../components/CharacterFilter";
import { charactersStyles } from "../../styles/characters";
import { useCharacters } from "../../hooks/useCharacters";
import { Character, CharactersQueryParams } from "../../interface/api";
import { ErrorScreen } from '../../components/ErrorScreen';
import { LoadingScreen } from '../../components/LoadingScreen';

export default function CharactersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  
  // Build query parameters for API filtering
  const queryParams: CharactersQueryParams = useMemo(() => {
    const params: CharactersQueryParams = {};
    
    if (searchQuery.trim()) {
      params.name = searchQuery.trim();
    }
    
    if (statusFilter) {
      params.status = statusFilter as 'alive' | 'dead' | 'unknown';
    }
    
    if (speciesFilter) {
      params.species = speciesFilter;
    }
    
    if (genderFilter) {
      params.gender = genderFilter as 'female' | 'male' | 'genderless' | 'unknown';
    }
    
    return params;
  }, [searchQuery, statusFilter, speciesFilter, genderFilter]);

  const { 
    data, 
    isLoading, 
    error 
  } = useCharacters(queryParams);

  const characters = data?.results || [];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  const handleSpeciesFilter = (species: string) => {
    setSpeciesFilter(species);
  };

  const handleGenderFilter = (gender: string) => {
    setGenderFilter(gender);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setSpeciesFilter('');
    setGenderFilter('');
  };

  const renderHeader = () => (
    <View style={charactersStyles.header}>
      <Ionicons name="people" size={32} color="#00ff00" />
      <Text style={charactersStyles.title}>Rick and Morty Characters</Text>
    </View>
  );

  const renderContent = () => {
    if (error) {
      return (
        <ErrorScreen error={error} />
      );
    }

    if (isLoading && characters.length === 0) {
      return (
        <LoadingScreen />
      );
    }

    if (characters.length === 0) {
      return (
        <View style={charactersStyles.emptyContainer}>
          <Ionicons name="search" size={64} color="#666666" />
          <Text style={charactersStyles.emptyTitle}>No Characters Found</Text>
          <Text style={charactersStyles.emptyText}>
            Try adjusting your search or filters
          </Text>
        </View>
      );
    }

    return (
      <>
        {isLoading && (
          <View style={charactersStyles.loadingOverlay}>
            <ActivityIndicator size="small" color="#00ff00" />
            <Text style={charactersStyles.loadingOverlayText}>Updating results...</Text>
          </View>
        )}
        {characters.map((character: Character) => (
          <CharactersList key={character.id} character={character} />
        ))}
      </>
    );
  };

  return (
    <View style={charactersStyles.container}>
      <ScrollView style={charactersStyles.scrollView}>
        {renderHeader()}
        <CharacterFilter
          onSearch={handleSearch}
          onStatusFilter={handleStatusFilter}
          onSpeciesFilter={handleSpeciesFilter}
          onGenderFilter={handleGenderFilter}
          onClearFilters={handleClearFilters}
          currentSearch={searchQuery}
          currentStatus={statusFilter}
          currentSpecies={speciesFilter}
          currentGender={genderFilter}
        />
        {renderContent()}
      </ScrollView>
    </View>
  );
} 