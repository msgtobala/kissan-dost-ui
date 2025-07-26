import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import DropDownPicker from "react-native-dropdown-picker";

const { width } = Dimensions.get("window");

export default function CropScreen() {
  const [open, setOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("1 day");
  const [items, setItems] = useState([
    { label: "1 day", value: "1 day" },
    { label: "7 days", value: "7 days" },
    { label: "1 month", value: "1 month" },
  ]);
  return (
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

      {/* Period Dropdown */}
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedText style={styles.sectionTitle}>Price</ThemedText>
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={open}
              value={selectedPeriod}
              items={items}
              setOpen={setOpen}
              setValue={setSelectedPeriod}
              setItems={setItems}
              style={styles.dropdownPicker}
              dropDownContainerStyle={{
                borderColor: Colors.light.primary,
                borderRadius: 16,
              }}
              placeholder="Select period"
              zIndex={3000}
              zIndexInverse={1000}
              listMode="SCROLLVIEW"
            />
          </View>
        </View>

        {/* Price Info Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.priceInfoRow}
          style={{ paddingVertical: 10 }}
        >
          {[
            { name: "Wheat", price: "₹2,150/qtl" },
            { name: "Rice", price: "₹1,950/qtl" },
            { name: "Maize", price: "₹340/qtl" },
          ].map((crop, idx) => (
            <View style={styles.priceCard} key={crop.name}>
              <ThemedText style={styles.priceCropName}>{crop.name}</ThemedText>
              <ThemedText style={styles.priceValue}>{crop.price}</ThemedText>
            </View>
          ))}
        </ScrollView>
        {/* Bar Chart for Crop Prices */}
        <ThemedText style={styles.sectionTitle}>Price Chart</ThemedText>
        <View
          style={{
            alignItems: "center",
            marginTop: 16,
            marginBottom: 24,
            backgroundColor: "white",
          }}
        >
          <BarChart
            data={{
              labels: ["Wheat", "Rice", "Maize"],
              datasets: [
                {
                  data: [2150, 1950, 340],
                },
              ],
            }}
            width={width - 40}
            height={220}
            yAxisLabel="₹"
            yAxisSuffix="/qtl"
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#F8F9FA",
              backgroundGradientTo: "#F8F9FA",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(33, 33, 33, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForBackgroundLines: {
                stroke: "#e3e3e3",
              },
              propsForLabels: {
                fontWeight: "bold",
              },
            }}
            style={{
              borderRadius: 16,
            }}
            fromZero
            showValuesOnTopOfBars
          />
        </View>
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
            <TouchableOpacity style={styles.featureButton} activeOpacity={0.8}>
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
            <ThemedText style={styles.primaryActionText}>Scan Plant</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Yield Estimator */}
        <View style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <View style={styles.featureIconContainer}>
              <MaterialCommunityIcons name="sprout" size={28} color="#FF9800" />
            </View>
            <View style={styles.featureInfo}>
              <ThemedText style={styles.featureTitle}>
                Visual Yield Estimator
              </ThemedText>
              <ThemedText style={styles.featureSubtitle}>
                Predict crop quantity and productivity
              </ThemedText>
            </View>
            <TouchableOpacity style={styles.featureButton} activeOpacity={0.8}>
              <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color={Colors.light.primary}
              />
            </TouchableOpacity>
          </View>
          <ThemedText style={styles.featureDescription}>
            Easily visualize and calculate your expected crop yield and
            associated costs using images and intuitive tools.
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

        {/* Visual Growth Estimator */}
        <View style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <View style={styles.featureIconContainer}>
              <MaterialCommunityIcons name="seed" size={28} color="#2196F3" />
            </View>
            <View style={styles.featureInfo}>
              <ThemedText style={styles.featureTitle}>
                Visual Growth Estimator
              </ThemedText>
              <ThemedText style={styles.featureSubtitle}>
                Track crop growth visually
              </ThemedText>
            </View>
            <TouchableOpacity style={styles.featureButton} activeOpacity={0.8}>
              <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color={Colors.light.primary}
              />
            </TouchableOpacity>
          </View>
          <ThemedText style={styles.featureDescription}>
            Monitor crop growth stages and get visual insights for better
            planning.
          </ThemedText>
          <TouchableOpacity
            style={styles.secondaryActionButtonBlue}
            activeOpacity={0.85}
          >
            <MaterialIcons
              name="timeline"
              size={20}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <ThemedText style={styles.secondaryActionText}>
              Estimate Growth
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  secondaryActionButtonBlue: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: "#2196F3",
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
  priceInfoRow: {
    flexDirection: "row",
    paddingHorizontal: 4,
    marginBottom: 24,
  },
  priceCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: "center",
    width: 120,
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  priceCropName: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.primary,
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.text,
    opacity: 0.85,
  },
  periodDropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    minWidth: 140,
    maxWidth: 180,
    alignSelf: "flex-end",
    marginRight: 10,
  },
  periodDropdown: {
    height: 36,
    color: Colors.light.primary,
    fontWeight: "600",
    fontSize: 15,
    backgroundColor: "#fff",
  },
  periodDropdownItem: {
    fontSize: 15,
    color: Colors.light.primary,
    fontWeight: "600",
  },
  dropdownWrapper: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "visible",
    marginBottom: 12,
    width: 120,
    alignSelf: "flex-end",
    marginRight: 10,
  },
  dropdownPicker: {
    backgroundColor: "#fff",
    borderColor: Colors.light.primary,
    borderRadius: 16,
    minHeight: 40,
    paddingHorizontal: 14,
    fontWeight: "600",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
});
