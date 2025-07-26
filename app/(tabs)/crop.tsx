import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function CropScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Professional Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <ThemedText style={styles.headerTitle}>Crop Management</ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              Monitor and optimize your farming operations
            </ThemedText>
          </View>
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.8}>
            <MaterialIcons
              name="notifications"
              size={24}
              color={Colors.light.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Main Features Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Smart Tools</ThemedText>

          {/* AI Plant Diagnosis */}
          <View style={styles.featureCard}>
            <View style={styles.featureHeader}>
              <View style={styles.featureIconContainer}>
                <MaterialCommunityIcons
                  name="camera-plus"
                  size={28}
                  color="#4CAF50"
                />
              </View>
              <View style={styles.featureInfo}>
                <ThemedText style={styles.featureTitle}>
                  AI Plant Diagnosis
                </ThemedText>
                <ThemedText style={styles.featureSubtitle}>
                  Instant disease detection
                </ThemedText>
              </View>
              <TouchableOpacity
                style={styles.featureButton}
                activeOpacity={0.8}
              >
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={16}
                  color={Colors.light.primary}
                />
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.featureDescription}>
              Scan your plants to get instant diagnosis, symptoms, and treatment
              recommendations powered by AI.
            </ThemedText>
            <TouchableOpacity
              style={styles.primaryActionButton}
              activeOpacity={0.85}
              onPress={() => router.push("/scan")}
            >
              <MaterialIcons
                name="camera-alt"
                size={20}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <ThemedText style={styles.primaryActionText}>
                Scan Plant
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Yield Estimator */}
          <View style={styles.featureCard}>
            <View style={styles.featureHeader}>
              <View style={styles.featureIconContainer}>
                <MaterialCommunityIcons
                  name="sprout"
                  size={28}
                  color="#FF9800"
                />
              </View>
              <View style={styles.featureInfo}>
                <ThemedText style={styles.featureTitle}>
                  Yield Estimator
                </ThemedText>
                <ThemedText style={styles.featureSubtitle}>
                  Predict crop output
                </ThemedText>
              </View>
              <TouchableOpacity
                style={styles.featureButton}
                activeOpacity={0.8}
              >
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={16}
                  color={Colors.light.primary}
                />
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.featureDescription}>
              Estimate your crop yield and cost visually. Upload photos or enter
              details for accurate predictions.
            </ThemedText>
            <TouchableOpacity
              style={styles.secondaryActionButton}
              activeOpacity={0.85}
            >
              <MaterialIcons
                name="add-photo-alternate"
                size={20}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <ThemedText style={styles.secondaryActionText}>
                Estimate Yield
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions Grid */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.quickActionCard}
              activeOpacity={0.8}
            >
              <View style={styles.quickActionIcon}>
                <MaterialCommunityIcons
                  name="weather-partly-cloudy"
                  size={24}
                  color="#2196F3"
                />
              </View>
              <ThemedText style={styles.quickActionTitle}>Weather</ThemedText>
              <ThemedText style={styles.quickActionSubtitle}>
                Check forecast
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              activeOpacity={0.8}
            >
              <View style={styles.quickActionIcon}>
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={24}
                  color="#FF9800"
                />
              </View>
              <ThemedText style={styles.quickActionTitle}>Schedule</ThemedText>
              <ThemedText style={styles.quickActionSubtitle}>
                Manage tasks
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              activeOpacity={0.8}
            >
              <View style={styles.quickActionIcon}>
                <MaterialCommunityIcons
                  name="chart-line"
                  size={24}
                  color="#4CAF50"
                />
              </View>
              <ThemedText style={styles.quickActionTitle}>Analytics</ThemedText>
              <ThemedText style={styles.quickActionSubtitle}>
                View insights
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              activeOpacity={0.8}
            >
              <View style={styles.quickActionIcon}>
                <MaterialCommunityIcons
                  name="book-open-variant"
                  size={24}
                  color="#9C27B0"
                />
              </View>
              <ThemedText style={styles.quickActionTitle}>Guide</ThemedText>
              <ThemedText style={styles.quickActionSubtitle}>
                Learn farming
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Recent Activity</ThemedText>
            <TouchableOpacity activeOpacity={0.8}>
              <ThemedText style={styles.viewAllText}>View All</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.activityCard}>
            <View style={styles.activityIcon}>
              <MaterialCommunityIcons name="leaf" size={20} color="#4CAF50" />
            </View>
            <View style={styles.activityContent}>
              <ThemedText style={styles.activityTitle}>
                Wheat crop scanned
              </ThemedText>
              <ThemedText style={styles.activitySubtitle}>
                Healthy - No issues detected
              </ThemedText>
              <ThemedText style={styles.activityTime}>2 hours ago</ThemedText>
            </View>
          </View>

          <View style={styles.activityCard}>
            <View style={styles.activityIcon}>
              <MaterialCommunityIcons name="sprout" size={20} color="#FF9800" />
            </View>
            <View style={styles.activityContent}>
              <ThemedText style={styles.activityTitle}>
                Yield estimate updated
              </ThemedText>
              <ThemedText style={styles.activitySubtitle}>
                Corn field - 85% expected yield
              </ThemedText>
              <ThemedText style={styles.activityTime}>1 day ago</ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContainer: {
    padding: 20,
    backgroundColor: "#F8F9FA",
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 8,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: 4,
    lineHeight: 36,
    includeFontPadding: false,
    textAlignVertical: "top",
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.light.text,
    opacity: 0.7,
    lineHeight: 22,
    includeFontPadding: false,
    textAlignVertical: "top",
  },
  headerButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.light.text,
    opacity: 0.7,
    textAlign: "center",
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: "600",
  },
  featureCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  featureHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureIconContainer: {
    backgroundColor: "#F0F8F0",
    borderRadius: 12,
    padding: 10,
    marginRight: 12,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: 2,
  },
  featureSubtitle: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.7,
  },
  featureButton: {
    padding: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 20,
    marginBottom: 16,
    opacity: 0.8,
  },
  primaryActionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryActionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  secondaryActionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF9800",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: "#FF9800",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryActionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickActionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    width: (width - 60) / 2,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionIcon: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.primary,
    textAlign: "center",
    marginBottom: 2,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: Colors.light.text,
    opacity: 0.6,
    textAlign: "center",
  },
  activityCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  activityIcon: {
    backgroundColor: "#F0F8F0",
    borderRadius: 10,
    padding: 8,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.primary,
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 13,
    color: Colors.light.text,
    opacity: 0.8,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: Colors.light.text,
    opacity: 0.6,
  },
});
