import { Text, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { favoritesStyles } from "../../styles/favorites";

function FavoritesList({ episode }: { episode: Record<string, any> }) {
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

export default function FavoritesScreen() {
  // Mock favorites data - you can replace this with actual stored favorites
  const favorites = [
    { id: 1, name: "Pilot", episode: "S01E01", air_date: "December 2, 2013" },
    { id: 3, name: "Anatomy Park", episode: "S01E03", air_date: "December 16, 2013" },
  ];

  return (
    <View style={favoritesStyles.container}>
      <ScrollView style={favoritesStyles.scrollView}>
        <View style={favoritesStyles.header}>
          <Ionicons name="heart" size={32} color="#ff6b6b" />
          <Text style={favoritesStyles.title}>Favorite Episodes</Text>
        </View>
        
        {favorites.length === 0 ? (
          <View style={favoritesStyles.emptyState}>
            <Ionicons name="heart-outline" size={64} color="#666666" />
            <Text style={favoritesStyles.emptyText}>No favorite episodes yet</Text>
            <Text style={favoritesStyles.emptySubtext}>
              Tap the heart icon on episodes to add them to your favorites
            </Text>
          </View>
        ) : (
          favorites.map((episode) => (
            <FavoritesList key={episode.id} episode={episode} />
          ))
        )}
      </ScrollView>
    </View>
  );
}
