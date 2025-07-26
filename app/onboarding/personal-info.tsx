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

export default function PersonalInfoScreen() {
  const { updateOnboardingData, onboardingData } = useOnboarding();
  const [age, setAge] = useState(onboardingData.age?.toString() || "");
  const [gender, setGender] = useState<"Male" | "Female" | "Other">(
    onboardingData.gender || "Male"
  );
  const [phoneNumber, setPhoneNumber] = useState(
    onboardingData.phoneNumber || ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (!age || !phoneNumber) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      Alert.alert("Error", "Please enter a valid age between 18 and 100");
      return;
    }

    if (phoneNumber.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    // Save data to context
    updateOnboardingData({
      age: ageNum,
      gender,
      phoneNumber,
    });

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/onboarding/location" as any);
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
                <ThemedText style={styles.title}>
                  Personal Information
                </ThemedText>
                <ThemedText style={styles.subtitle}>
                  Tell us a bit about yourself
                </ThemedText>
              </View>

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <ThemedText style={styles.label}>Age</ThemedText>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your age"
                    placeholderTextColor="#8a9a8a"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                    maxLength={3}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <ThemedText style={styles.label}>Gender</ThemedText>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={gender}
                      onValueChange={(itemValue: "Male" | "Female" | "Other") =>
                        setGender(itemValue)
                      }
                      style={styles.picker}
                    >
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                      <Picker.Item label="Other" value="Other" />
                    </Picker>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <ThemedText style={styles.label}>Phone Number</ThemedText>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#8a9a8a"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    maxLength={15}
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
