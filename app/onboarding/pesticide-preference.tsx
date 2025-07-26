import { ThemedText } from "@/components/ThemedText";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { PesticidePreference } from "@/services/firestoreService";
import { Picker } from "@react-native-picker/picker";
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
  TouchableOpacity,
  View,
} from "react-native";

const PESTICIDE_OPTIONS: {
  label: string;
  value: PesticidePreference;
  description: string;
}[] = [
  {
    label: "Organic",
    value: "Organic",
    description: "Use only natural and organic pest control methods",
  },
  {
    label: "Chemical",
    value: "Chemical",
    description: "Use synthetic chemical pesticides when needed",
  },
  {
    label: "Mixed",
    value: "Mixed",
    description: "Use a combination of organic and chemical methods",
  },
  {
    label: "None",
    value: "None",
    description: "Prefer not to use any pesticides",
  },
];

export default function PesticidePreferenceScreen() {
  const { updateOnboardingData, onboardingData } = useOnboarding();
  const [pesticidePreference, setPesticidePreference] = useState<
    PesticidePreference | undefined
  >(onboardingData.pesticidePreference);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (!pesticidePreference) {
      Alert.alert("Error", "Please select your pesticide preference");
      return;
    }

    // Save data to context
    updateOnboardingData({
      pesticidePreference,
    });

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/onboarding/complete" as any);
    }, 1000);
  };

  const handleBack = () => {
    router.back();
  };

  const selectedPreferenceInfo = PESTICIDE_OPTIONS.find(
    (option) => option.value === pesticidePreference
  );

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
                <ThemedText style={styles.title}>
                  Pesticide Preference
                </ThemedText>
                <ThemedText style={styles.subtitle}>
                  How do you prefer to manage pests in your crops?
                </ThemedText>
              </View>

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <ThemedText style={styles.label}>
                    Pesticide Preference
                  </ThemedText>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={pesticidePreference}
                      onValueChange={(itemValue: PesticidePreference) =>
                        setPesticidePreference(itemValue)
                      }
                      style={styles.picker}
                    >
                      <Picker.Item
                        label="Select your preference"
                        value={undefined}
                      />
                      {PESTICIDE_OPTIONS.map((option) => (
                        <Picker.Item
                          key={option.value}
                          label={option.label}
                          value={option.value}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                {selectedPreferenceInfo && (
                  <View style={styles.infoCard}>
                    <View style={styles.infoHeader}>
                      <ThemedText style={styles.infoTitle}>
                        {selectedPreferenceInfo.label}
                      </ThemedText>
                    </View>
                    <ThemedText style={styles.infoDescription}>
                      {selectedPreferenceInfo.description}
                    </ThemedText>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.nextButton, isLoading && styles.disabledButton]}
                onPress={handleNext}
                disabled={isLoading}
              >
                <ThemedText style={styles.nextButtonText}>
                  {isLoading ? "Loading..." : "Complete Setup"}
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
  pickerContainer: {
    height: 56,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "white",
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  picker: {
    height: 56,
    width: "100%",
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoHeader: {
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d3748",
  },
  infoDescription: {
    fontSize: 14,
    color: "#718096",
    lineHeight: 20,
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
