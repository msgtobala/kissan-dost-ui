import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { logout, user, checkOnboardingStatus, isOnboardingComplete } =
    useAuth();

  const categories = [
    { name: "Plant", icon: "🌱" },
    { name: "Brinjal", icon: "🍆" },
    { name: "Mango", icon: "🥭" },
    { name: "Pumpkin", icon: "🎃" },
    { name: "La", icon: "🌿" },
  ];

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
          } catch (error) {
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };

  const handleCheckOnboarding = async () => {
    try {
      await checkOnboardingStatus();
      Alert.alert(
        "Debug",
        `Onboarding status: ${isOnboardingComplete ? "Complete" : "Incomplete"}`
      );
    } catch (error) {
      Alert.alert("Error", "Failed to check onboarding status");
    }
  };

  const greeting = user?.displayName || user?.email?.split("@")[0] || "User";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8faf8" />
      <LinearGradient colors={["#f8faf8", "#e8f5e8"]} style={styles.gradient}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <ThemedText style={styles.timeText}>9:41</ThemedText>
              <TouchableOpacity style={styles.notificationButton}>
                <ThemedText style={styles.notificationIcon}>🔔</ThemedText>
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.greeting}>Hello {greeting}</ThemedText>
            <TouchableOpacity
              onPress={handleCheckOnboarding}
              style={styles.debugButton}
            >
              <ThemedText style={styles.debugButtonText}>
                Debug: Check Onboarding
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <ThemedText style={styles.searchIcon}>🔍</ThemedText>
              <TextInput
                style={styles.searchInput}
                placeholder="What Service are you looking for?"
                placeholderTextColor="#8a9a8a"
              />
            </View>
          </View>

          {/* Categories Section */}
          <View style={styles.categoriesSection}>
            <View style={styles.categoriesHeader}>
              <ThemedText style={styles.sectionTitle}>Categories</ThemedText>
              <TouchableOpacity>
                <ThemedText style={styles.addMoreText}>+ Add More</ThemedText>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesScroll}
            >
              {categories.map((category, index) => (
                <TouchableOpacity key={index} style={styles.categoryItem}>
                  <View style={styles.categoryIcon}>
                    <ThemedText style={styles.categoryEmoji}>
                      {category.icon}
                    </ThemedText>
                  </View>
                  <ThemedText style={styles.categoryName}>
                    {category.name}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Feature Banner */}
          <View style={styles.featureBanner}>
            <View style={styles.bannerContent}>
              <View style={styles.bannerLeft}>
                <ThemedText style={styles.bannerTitle}>Scan Plant</ThemedText>
                <ThemedText style={styles.bannerSubtitle}>
                  Identify plants and get care tips
                </ThemedText>
                <TouchableOpacity style={styles.scanButton}>
                  <ThemedText style={styles.scanButtonText}>
                    Scan Plant
                  </ThemedText>
                </TouchableOpacity>
              </View>
              <View style={styles.bannerRight}>
                <View style={styles.bannerIllustration}>
                  <ThemedText style={styles.illustrationIcon}>🌿</ThemedText>
                </View>
              </View>
            </View>
          </View>

          {/* Weather Section */}
          <View style={styles.weatherSection}>
            <ThemedText style={styles.sectionTitle}>Weather</ThemedText>
            <View style={styles.weatherCard}>
              <View style={styles.weatherInfo}>
                <ThemedText style={styles.temperature}>19°</ThemedText>
                <View style={styles.weatherDetails}>
                  <ThemedText style={styles.weatherDescription}>
                    Sunny Day 26°/11°
                  </ThemedText>
                  <ThemedText style={styles.feelsLike}>
                    Feels like 26°
                  </ThemedText>
                </View>
              </View>
              <View style={styles.weatherIcon}>
                <ThemedText style={styles.sunIcon}>☀️</ThemedText>
              </View>
            </View>
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNavigation}>
          <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
            <ThemedText style={styles.navIcon}>🏠</ThemedText>
            <ThemedText style={[styles.navText, styles.activeNavText]}>
              Home
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <ThemedText style={styles.navIcon}>👥</ThemedText>
            <ThemedText style={styles.navText}>Community</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <ThemedText style={styles.navIcon}>💬</ThemedText>
            <ThemedText style={styles.navText}>Chat</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <ThemedText style={styles.navIcon}>📹</ThemedText>
            <ThemedText style={styles.navText}>Videos</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={handleLogout}>
            <ThemedText style={styles.navIcon}>👤</ThemedText>
            <ThemedText style={styles.navText}>Account</ThemedText>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationIcon: {
    fontSize: 18,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2d3748",
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
    color: "#8a9a8a",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#2d3748",
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2d3748",
  },
  addMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#48bb78",
  },
  categoriesScroll: {
    flexDirection: "row",
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 20,
    minWidth: 60,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#2d3748",
    textAlign: "center",
  },
  featureBanner: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  bannerContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  bannerLeft: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 16,
  },
  scanButton: {
    backgroundColor: "#48bb78",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  scanButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  bannerRight: {
    marginLeft: 20,
  },
  bannerIllustration: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e8f5e8",
    justifyContent: "center",
    alignItems: "center",
  },
  illustrationIcon: {
    fontSize: 40,
  },
  weatherSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  weatherCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  weatherInfo: {
    flex: 1,
  },
  temperature: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: 4,
  },
  weatherDetails: {
    marginBottom: 8,
  },
  weatherDescription: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 2,
  },
  feelsLike: {
    fontSize: 14,
    color: "#718096",
  },
  weatherIcon: {
    marginLeft: 20,
  },
  sunIcon: {
    fontSize: 40,
  },
  bottomSpacing: {
    height: 100,
  },
  bottomNavigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  activeNavItem: {
    // Active state styling
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#718096",
  },
  activeNavText: {
    color: "#48bb78",
    fontWeight: "600",
  },
  debugButton: {
    backgroundColor: "#f56565",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  debugButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});
