import React from 'react';
import { Text, View } from "react-native";
import { charactersStyles } from "../styles/characters";
import { Character } from "../interface/api";

interface CharactersListProps {
  character: Character;
}

export function CharactersList({ character }: CharactersListProps) {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return [charactersStyles.characterStatus, charactersStyles.statusAlive];
      case 'dead':
        return [charactersStyles.characterStatus, charactersStyles.statusDead];
      default:
        return [charactersStyles.characterStatus, charactersStyles.statusUnknown];
    }
  };

  const getGenderIcon = (gender: string) => {
    switch (gender.toLowerCase()) {
      case 'male':
        return '♂';
      case 'female':
        return '♀';
      case 'genderless':
        return '⚪';
      default:
        return '❓';
    }
  };

  return (
    <View key={character.id} style={charactersStyles.characterCard}>
      <View style={charactersStyles.characterHeader}>
        <Text style={charactersStyles.characterName}>{character.name}</Text>
        <Text style={getStatusStyle(character.status)}>
          {character.status.toUpperCase()}
        </Text>
      </View>
      
      <View style={charactersStyles.characterInfo}>
        <Text style={charactersStyles.characterSpecies}>
          {character.species}
        </Text>
        <Text style={charactersStyles.characterGender}>
          {getGenderIcon(character.gender)} {character.gender}
        </Text>
        <Text style={charactersStyles.characterLocation}>
          📍 {character.location.name}
        </Text>
      </View>
    </View>
  );
} 