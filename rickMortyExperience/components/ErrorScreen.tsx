import { charactersStyles } from "../styles/characters";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export function ErrorScreen({ error }: { error: Error }) {
    return (
        <View style={charactersStyles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color="#ff6b6b" />
          <Text style={charactersStyles.errorTitle}>Error Loading Characters</Text>
          <Text style={charactersStyles.errorText}>
            {error instanceof Error ? error.message : 'Something went wrong'}
          </Text>
        </View>
    );
}