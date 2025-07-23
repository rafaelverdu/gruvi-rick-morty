import { StyleSheet } from "react-native";

export const episodesStyles = StyleSheet.create({
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
    episodeCard: {
      backgroundColor: "#1a1a1a",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderLeftWidth: 4,
      borderLeftColor: "#00ff00",
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
      color: "#00ff00",
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