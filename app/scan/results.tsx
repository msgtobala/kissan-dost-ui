import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScanResultsScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  useEffect(() => {
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        plantName: "Ponytail Palm",
        health: "Healthy",
        confidence: 95,
        issues: [],
        recommendations: [
          "Continue current watering schedule",
          "Ensure adequate sunlight exposure",
          "Monitor for any yellowing leaves",
        ],
      });
      setIsAnalyzing(false);
    }, 3000);
  }, []);

  const handleNewScan = () => {
    router.back();
  };

  const handleSaveResult = () => {
    // TODO: Save result to user's plant collection
    router.push("/(tabs)/crop");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analysis Results</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image Preview */}
        <View style={styles.imageContainer}>
          {imageUri && imageUri !== "placeholder" ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.capturedImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <MaterialIcons name="photo" size={64} color="#666" />
              <Text style={styles.imagePlaceholderText}>Captured Image</Text>
            </View>
          )}
        </View>

        {/* Analysis Results */}
        {isAnalyzing ? (
          <View style={styles.analyzingContainer}>
            <ActivityIndicator size="large" color={Colors.light.primary} />
            <Text style={styles.analyzingText}>Analyzing your plant...</Text>
            <Text style={styles.analyzingSubtext}>
              Our AI is examining the image for plant health and disease
              detection
            </Text>
          </View>
        ) : (
          <View style={styles.resultsContainer}>
            {/* Plant Identification */}
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <MaterialIcons name="eco" size={24} color="#4CAF50" />
                <Text style={styles.resultTitle}>Plant Identified</Text>
              </View>
              <Text style={styles.plantName}>{analysisResult?.plantName}</Text>
              <Text style={styles.confidenceText}>
                Confidence: {analysisResult?.confidence}%
              </Text>
            </View>

            {/* Health Status */}
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <MaterialIcons name="favorite" size={24} color="#4CAF50" />
                <Text style={styles.resultTitle}>Health Status</Text>
              </View>
              <View style={styles.healthStatus}>
                <View style={[styles.healthIndicator, styles.healthy]} />
                <Text style={styles.healthText}>{analysisResult?.health}</Text>
              </View>
            </View>

            {/* Recommendations */}
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <MaterialIcons name="lightbulb" size={24} color="#FF9800" />
                <Text style={styles.resultTitle}>Care Recommendations</Text>
              </View>
              {analysisResult?.recommendations.map(
                (rec: string, index: number) => (
                  <View key={index} style={styles.recommendationItem}>
                    <MaterialIcons
                      name="check-circle"
                      size={16}
                      color="#4CAF50"
                    />
                    <Text style={styles.recommendationText}>{rec}</Text>
                  </View>
                )
              )}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Actions */}
      {!isAnalyzing && (
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleNewScan}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="camera-alt"
              size={20}
              color={Colors.light.primary}
            />
            <Text style={styles.secondaryButtonText}>Scan Another</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSaveResult}
            activeOpacity={0.8}
          >
            <MaterialIcons name="save" size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>Save Result</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.light.primary,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  capturedImage: {
    height: 200,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imagePlaceholderText: {
    color: "#666",
    fontSize: 16,
    marginTop: 8,
  },
  analyzingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  analyzingText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.primary,
    marginTop: 20,
    marginBottom: 8,
  },
  analyzingSubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  resultsContainer: {
    gap: 16,
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.primary,
    marginLeft: 8,
  },
  plantName: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: 4,
  },
  confidenceText: {
    fontSize: 14,
    color: "#666",
  },
  healthStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  healthIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  healthy: {
    backgroundColor: "#4CAF50",
  },
  healthText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
  },
  recommendationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
    flex: 1,
  },
  bottomActions: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  secondaryButtonText: {
    color: Colors.light.primary,
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },
  primaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },
});
