import { Text, View } from "react-native";
import { episodesStyles } from "../styles/episodes";
import { Ionicons } from "@expo/vector-icons";
import { Episode } from "../interface/api";

export function EpisodesList({ episode }: { episode: Episode }) {
    return (
      <View key={episode.id} style={episodesStyles.episodeCard}>
        <View style={episodesStyles.episodeHeader}>
          <Text style={episodesStyles.episodeNumber}>{episode.episode}</Text>
          <Ionicons name="heart-outline" size={20} color="#666666" />
        </View>
        <Text style={episodesStyles.episodeName}>{episode.name}</Text>
        <Text style={episodesStyles.airDate}>{episode.air_date}</Text>
      </View>
    );
  }