import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    setIsLoading(true);

    try {
      await signUp(email, password, name);
    } catch (error: any) {
      Alert.alert(
        "Signup Error",
        error.message || "An error occurred during signup"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };
  return (
    <LinearGradient colors={["#effbf4", "#d7f2e1"]} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ThemedView style={styles.content}>
            <ThemedText
              type="title"
              style={[styles.title, { color: "#275d63" }]}
            >
              Create Account
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: "#275d63" }]}>
              Join Kissan Dost and start your farming journey
            </ThemedText>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <ThemedText style={[styles.label, { color: "#275d63" }]}>
                  Full Name
                </ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#275d63aa"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <ThemedText style={[styles.label, { color: "#275d63" }]}>
                  Email
                </ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#275d63aa"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <ThemedText style={[styles.label, { color: "#275d63" }]}>
                  Password
                </ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Create a password"
                  placeholderTextColor="#275d63aa"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <ThemedText style={[styles.label, { color: "#275d63" }]}>
                  Confirm Password
                </ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor="#275d63aa"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.signupButton,
                  isLoading && styles.disabledButton,
                ]}
                onPress={handleSignup}
                disabled={isLoading}
              >
                <ThemedText style={styles.signupButtonText}>
                  {isLoading ? "Creating Account..." : "Create Account"}{" "}
                </ThemedText>
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <ThemedText style={[styles.loginText, { color: "#275d63" }]}>
                  Already have an account?{" "}
                </ThemedText>
                <TouchableOpacity onPress={handleLogin}>
                  <ThemedText style={styles.loginLink}>Sign In</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    padding: 24,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: "center",
    opacity: 0.8,
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "white",
    color: "#275d63",
    borderColor: "#275d63",
    shadowColor: "#275d63",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signupButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#e58948",
    shadowColor: "#e58948",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.6,
  },
  signupButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  loginText: {
    fontSize: 16,
  },
  loginLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e58948",
  },
});
