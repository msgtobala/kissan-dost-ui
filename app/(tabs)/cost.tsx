import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";

export default function CostScreen() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Cost Management</ThemedText>
      <ThemedText style={styles.subtitle}>
        Track your farming expenses and costs
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8faf8",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "#718096",
    textAlign: "center",
  },
});
