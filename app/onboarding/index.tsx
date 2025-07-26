import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";

export default function OnboardingWelcomeScreen() {
  const handleGetStarted = () => {
    router.push("/onboarding/personal-info");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8faf8" />
      <LinearGradient colors={["#f8faf8", "#e8f5e8"]} style={styles.gradient}>
        <View style={styles.content}>
          <View style={styles.header}>
            <ThemedText style={styles.timeText}>9:41</ThemedText>
          </View>

          <View style={styles.mainContent}>
            <View style={styles.imageContainer}>
              <View style={styles.imagePlaceholder}>
                <ThemedText style={styles.imageText}>🌾</ThemedText>
              </View>
            </View>

            <View style={styles.titleSection}>
              <ThemedText style={styles.title}>
                Welcome to Kisan Dost
              </ThemedText>
              <ThemedText style={styles.subtitle}>
                Let&apos;s get to know you better to provide personalized
                farming insights and recommendations
              </ThemedText>
            </View>

            <View style={styles.infoSection}>
              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <ThemedText style={styles.iconText}>📊</ThemedText>
                </View>
                <View style={styles.infoContent}>
                  <ThemedText style={styles.infoTitle}>
                    Personalized Insights
                  </ThemedText>
                  <ThemedText style={styles.infoDescription}>
                    Get crop recommendations based on your location and soil
                    type
                  </ThemedText>
                </View>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <ThemedText style={styles.iconText}>🌤️</ThemedText>
                </View>
                <View style={styles.infoContent}>
                  <ThemedText style={styles.infoTitle}>
                    Weather Alerts
                  </ThemedText>
                  <ThemedText style={styles.infoDescription}>
                    Receive timely weather updates for your farming area
                  </ThemedText>
                </View>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <ThemedText style={styles.iconText}>💡</ThemedText>
                </View>
                <View style={styles.infoContent}>
                  <ThemedText style={styles.infoTitle}>Expert Tips</ThemedText>
                  <ThemedText style={styles.infoDescription}>
                    Access farming best practices and pest management advice
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={handleGetStarted}
            >
              <ThemedText style={styles.getStartedButtonText}>
                Get Started
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
    textAlign: "right",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#48bb78",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#48bb78",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  imageText: {
    fontSize: 48,
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  infoSection: {
    marginBottom: 40,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e8f5e8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    color: "#718096",
    lineHeight: 20,
  },
  footer: {
    paddingBottom: 40,
  },
  getStartedButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#48bb78",
    shadowColor: "#48bb78",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  getStartedButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
