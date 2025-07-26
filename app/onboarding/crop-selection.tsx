import { ThemedText } from "@/components/ThemedText";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const COMMON_CROPS = [
  "Rice",
  "Wheat",
  "Maize",
  "Cotton",
  "Sugarcane",
  "Pulses",
  "Oilseeds",
  "Vegetables",
  "Fruits",
  "Spices",
  "Tea",
  "Coffee",
  "Jute",
  "Tobacco",
  "Potato",
  "Onion",
  "Tomato",
  "Chilli",
  "Ginger",
  "Turmeric",
];

export default function CropSelectionScreen() {
  const { updateOnboardingData, onboardingData } = useOnboarding();
  const [primaryCrop, setPrimaryCrop] = useState(
    onboardingData.primaryCrop || ""
  );
  const [seasonalCrops, setSeasonalCrops] = useState<string[]>(
    onboardingData.seasonalCrops || []
  );
  const [newCrop, setNewCrop] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSeasonalCrop = () => {
    if (!newCrop.trim()) {
      Alert.alert("Error", "Please enter a crop name");
      return;
    }

    if (seasonalCrops.includes(newCrop.trim())) {
      Alert.alert("Error", "This crop is already added");
      return;
    }

    setSeasonalCrops([...seasonalCrops, newCrop.trim()]);
    setNewCrop("");
  };

  const handleRemoveSeasonalCrop = (cropToRemove: string) => {
    setSeasonalCrops(seasonalCrops.filter((crop) => crop !== cropToRemove));
  };

  const handleNext = () => {
    if (!primaryCrop) {
      Alert.alert("Error", "Please select your primary crop");
      return;
    }

    // Save data to context
    updateOnboardingData({
      primaryCrop,
      seasonalCrops,
    });

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/onboarding/pesticide-preference" as any);
    }, 1000);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8faf8" />
      <LinearGradient colors={["#f8faf8", "#e8f5e8"]} style={styles.gradient}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <ThemedText style={styles.backButtonText}>← Back</ThemedText>
              </TouchableOpacity>
              <ThemedText style={styles.timeText}>9:41</ThemedText>
            </View>

            <View style={styles.content}>
              <View style={styles.titleSection}>
                <ThemedText style={styles.title}>Crop Selection</ThemedText>
                <ThemedText style={styles.subtitle}>
                  Tell us about your farming preferences
                </ThemedText>
              </View>

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <ThemedText style={styles.label}>Primary Crop</ThemedText>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your primary crop"
                    placeholderTextColor="#8a9a8a"
                    value={primaryCrop}
                    onChangeText={setPrimaryCrop}
                    autoCapitalize="words"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <ThemedText style={styles.label}>Seasonal Crops</ThemedText>
                  <ThemedText style={styles.subLabel}>
                    Add crops you grow in different seasons
                  </ThemedText>

                  <View style={styles.addCropContainer}>
                    <TextInput
                      style={[styles.input, styles.addCropInput]}
                      placeholder="Enter crop name"
                      placeholderTextColor="#8a9a8a"
                      value={newCrop}
                      onChangeText={setNewCrop}
                      autoCapitalize="words"
                    />
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={handleAddSeasonalCrop}
                    >
                      <ThemedText style={styles.addButtonText}>Add</ThemedText>
                    </TouchableOpacity>
                  </View>

                  {seasonalCrops.length > 0 && (
                    <View style={styles.cropsList}>
                      {seasonalCrops.map((crop, index) => (
                        <View key={index} style={styles.cropItem}>
                          <ThemedText style={styles.cropText}>
                            {crop}
                          </ThemedText>
                          <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => handleRemoveSeasonalCrop(crop)}
                          >
                            <ThemedText style={styles.removeButtonText}>
                              ×
                            </ThemedText>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.nextButton, isLoading && styles.disabledButton]}
                onPress={handleNext}
                disabled={isLoading}
              >
                <ThemedText style={styles.nextButtonText}>
                  {isLoading ? "Loading..." : "Next"}
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#48bb78",
  },
  timeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 50,
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
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 8,
  },
  subLabel: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 12,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: "white",
    color: "#2d3748",
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  addCropContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  addCropInput: {
    flex: 1,
    marginRight: 12,
  },
  addButton: {
    height: 56,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#48bb78",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cropsList: {
    marginTop: 8,
  },
  cropItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cropText: {
    fontSize: 16,
    color: "#2d3748",
    flex: 1,
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f56565",
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  nextButton: {
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
  disabledButton: {
    opacity: 0.6,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
