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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      await signIn(email, password);
      // Navigation will be handled by auth state change
    } catch (error: any) {
      Alert.alert(
        "Login Error",
        error.message || "An error occurred during login"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    router.push("/auth/signup");
  };
  return (
    <LinearGradient colors={["#effbf4", "#d7f2e1"]} style={styles.container}>
      {" "}
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
              Welcome Back
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: "#275d63" }]}>
              Sign in to your Kissan Dost account
            </ThemedText>

            <View style={styles.form}>
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
                  placeholder="Enter your password"
                  placeholderTextColor="#275d63aa"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.disabledButton]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <ThemedText style={styles.loginButtonText}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </ThemedText>
              </TouchableOpacity>

              <View style={styles.signupContainer}>
                <ThemedText style={[styles.signupText, { color: "#275d63" }]}>
                  Don&apos;t have an account?{" "}
                </ThemedText>
                <TouchableOpacity onPress={handleSignup}>
                  <ThemedText style={styles.signupLink}>Sign Up</ThemedText>
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
  loginButton: {
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
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  signupText: {
    fontSize: 16,
  },
  signupLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e58948",
  },
});
