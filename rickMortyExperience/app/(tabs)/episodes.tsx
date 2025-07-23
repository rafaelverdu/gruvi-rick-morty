import { Text, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EpisodesList } from "@/components/episodes";
import { episodesStyles } from "@/styles/episodes";

export default function EpisodesScreen() {
  // Mock episodes data - you can replace this with actual API data
  const episodes = [
    { id: 1, name: "Pilot", episode: "S01E01", air_date: "December 2, 2013" },
    { id: 2, name: "Lawnmower Dog", episode: "S01E02", air_date: "December 9, 2013" },
    { id: 3, name: "Anatomy Park", episode: "S01E03", air_date: "December 16, 2013" },
    { id: 4, name: "M. Night Shaym-Aliens!", episode: "S01E04", air_date: "January 13, 2014" },
    { id: 5, name: "Meeseeks and Destroy", episode: "S01E05", air_date: "January 20, 2014" },
  ];

  return (
    <View style={episodesStyles.container}>
      <ScrollView style={episodesStyles.scrollView}>
        <View style={episodesStyles.header}>
          <Ionicons name="tv" size={32} color="#00ff00" />
          <Text style={episodesStyles.title}>Rick and Morty Episodes</Text>
        </View>
        
        {episodes.map((episode) => (
          <EpisodesList key={episode.id} episode={episode} />
        ))}
      </ScrollView>
    </View>
  );
}