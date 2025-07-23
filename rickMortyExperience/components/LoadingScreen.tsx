import { episodesStyles } from "../styles/episodes";
import { View, ActivityIndicator, Text } from "react-native";

export function LoadingScreen() {
    return (
    <View style={episodesStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text style={episodesStyles.loadingText}>Loading data...</Text>
      </View>
    );
}