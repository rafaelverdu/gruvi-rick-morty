import { StyleSheet } from "react-native";

export const favoritesStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0a0a0a",
    },
    scrollView: {
      flex: 1,
      padding: 16,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 24,
      paddingTop: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#ffffff",
      marginLeft: 12,
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 64,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: "600",
      color: "#ffffff",
      marginTop: 16,
      marginBottom: 8,
    },
    emptySubtext: {
      fontSize: 14,
      color: "#999999",
      textAlign: "center",
      paddingHorizontal: 32,
    },
    favoriteCard: {
      backgroundColor: "#1a1a1a",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderLeftWidth: 4,
      borderLeftColor: "#ff6b6b",
    },
    episodeHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    episodeNumber: {
      fontSize: 14,
      fontWeight: "600",
      color: "#ff6b6b",
    },
    episodeName: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#ffffff",
      marginBottom: 4,
    },
    airDate: {
      fontSize: 14,
      color: "#999999",
    },
  }); 