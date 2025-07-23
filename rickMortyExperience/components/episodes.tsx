import { Text, View } from "react-native";
import { favoritesStyles } from "@/styles/favorites";
import { Ionicons } from "@expo/vector-icons";

export function EpisodesList({ episode }: { episode: Record<string, any> }) {
    return (
      <View key={episode.id} style={favoritesStyles.favoriteCard}>
                <View style={favoritesStyles.episodeHeader}>
                  <Text style={favoritesStyles.episodeNumber}>{episode.episode}</Text>
                  <Ionicons name="heart" size={20} color="#ff6b6b" />
                </View>
                <Text style={favoritesStyles.episodeName}>{episode.name}</Text>
                <Text style={favoritesStyles.airDate}>{episode.air_date}</Text>
              </View>
    );
  }