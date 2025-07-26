import { ThemedText } from "@/components/ThemedText";
import { useOnboarding } from "@/contexts/OnboardingContext";
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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Sample data - in a real app, this would come from an API
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function LocationScreen() {
  const { updateOnboardingData, onboardingData } = useOnboarding();
  const [state, setState] = useState(onboardingData.state || "");
  const [village, setVillage] = useState(onboardingData.village || "");
  const [taluk, setTaluk] = useState(onboardingData.taluk || "");
  const [address, setAddress] = useState(onboardingData.address || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (!state || !village || !taluk || !address) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Save data to context
    updateOnboardingData({
      state,
      village,
      taluk,
      address,
    });

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/onboarding/farming-details" as any);
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
                <ThemedText style={styles.title}>Location Details</ThemedText>
                <ThemedText style={styles.subtitle}>
                  Help us understand your farming location
                </ThemedText>
              </View>

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <ThemedText style={styles.label}>State</ThemedText>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={state}
                      onValueChange={(itemValue: string) => setState(itemValue)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Select your state" value="" />
                      {INDIAN_STATES.map((stateName) => (
                        <Picker.Item
                          key={stateName}
                          label={stateName}
                          value={stateName}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <ThemedText style={styles.label}>Village</ThemedText>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your village name"
                    placeholderTextColor="#8a9a8a"
                    value={village}
                    onChangeText={setVillage}
                    autoCapitalize="words"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <ThemedText style={styles.label}>Taluk</ThemedText>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your taluk name"
                    placeholderTextColor="#8a9a8a"
                    value={taluk}
                    onChangeText={setTaluk}
                    autoCapitalize="words"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <ThemedText style={styles.label}>Full Address</ThemedText>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Enter your complete address"
                    placeholderTextColor="#8a9a8a"
                    value={address}
                    onChangeText={setAddress}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
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
  textArea: {
    height: 80,
    paddingTop: 16,
    paddingBottom: 16,
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
