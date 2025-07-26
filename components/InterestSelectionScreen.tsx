import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function InterestSelectionScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests = [
    {
      id: "farming",
      name: "Farming",
      icon: "🌾",
      color: colors.success,
      selected: false,
    },
    {
      id: "agriculture-news",
      name: "Agriculture News",
      icon: "📰",
      color: colors.secondary,
      selected: false,
    },
    {
      id: "indoor-plant",
      name: "Indoor Plant",
      icon: "🪴",
      color: colors.primary,
      selected: false,
    },
    {
      id: "outdoor-plant",
      name: "Outdoor Plant",
      icon: "🌳",
      color: "#4CAF50",
      selected: false,
    },
    {
      id: "tips",
      name: "Tips",
      icon: "💡",
      color: "#FF9800",
      selected: false,
    },
    {
      id: "community",
      name: "Community",
      icon: "👥",
      color: "#9C27B0",
      selected: false,
    },
    {
      id: "weather",
      name: "Weather",
      icon: "🌤️",
      color: "#2196F3",
      selected: false,
    },
    {
      id: "market-prices",
      name: "Market Prices",
      icon: "💰",
      color: "#FF5722",
      selected: false,
    },
  ];

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interestId)) {
        return prev.filter((id) => id !== interestId);
      } else {
        return [...prev, interestId];
      }
    });
  };

  const handleContinue = () => {
    // Save selected interests to user preferences
    console.log("Selected interests:", selectedInterests);
    router.replace("/(tabs)");
  };

  const handleSkip = () => {
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleSkip}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={[styles.skipButton, { color: colors.primary }]}>
            Skip All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Set your interest</Text>
          <Text style={styles.subtitle}>
            Choose topics that interest you to personalize your farming
            experience
          </Text>
        </View>

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustration}>
            <Text style={styles.illustrationEmoji}>🌱</Text>
          </View>
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            style={styles.illustrationBackground}
          />
        </View>

        {/* Interest Grid */}
        <View style={styles.interestsGrid}>
          {interests.map((interest) => {
            const isSelected = selectedInterests.includes(interest.id);
            return (
              <TouchableOpacity
                key={interest.id}
                style={[
                  styles.interestCard,
                  isSelected && {
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                  },
                ]}
                onPress={() => toggleInterest(interest.id)}
              >
                <View
                  style={[
                    styles.interestIcon,
                    {
                      backgroundColor: isSelected
                        ? "rgba(255,255,255,0.2)"
                        : interest.color + "20",
                    },
                  ]}
                >
                  <Text style={styles.interestEmoji}>{interest.icon}</Text>
                </View>
                <Text
                  style={[
                    styles.interestName,
                    { color: isSelected ? "#fff" : colors.text },
                  ]}
                >
                  {interest.name}
                </Text>
                {isSelected && (
                  <View style={styles.selectedIndicator}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: "80%", backgroundColor: colors.primary },
              ]}
            />
          </View>
          <Text style={styles.progressText}>4 of 5 completed</Text>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            {
              backgroundColor:
                selectedInterests.length > 0 ? colors.primary : colors.border,
            },
          ]}
          onPress={handleContinue}
          disabled={selectedInterests.length === 0}
        >
          <Text
            style={[
              styles.continueButtonText,
              {
                color:
                  selectedInterests.length > 0 ? "#fff" : colors.placeholder,
              },
            ]}
          >
            Continue ({selectedInterests.length} selected)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  skipButton: {
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 50,
    position: "relative",
  },
  illustration: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  illustrationEmoji: {
    fontSize: 48,
  },
  illustrationBackground: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    top: -40,
    zIndex: 1,
  },
  interestsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  interestCard: {
    width: (width - 60) / 2,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#f0f0f0",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  interestIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  interestEmoji: {
    fontSize: 28,
  },
  interestName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  selectedIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  progressBar: {
    width: "60%",
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: "#999",
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  continueButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
