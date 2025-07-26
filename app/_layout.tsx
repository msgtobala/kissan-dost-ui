import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import AuthWrapper from "@/components/AuthWrapper";
import { AuthProvider } from "@/contexts/AuthContext";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    // You can add custom fonts here when available
    // Eloquia: require("../assets/fonts/Eloquia-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AuthProvider>
      <OnboardingProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#F8F9FA",
          }}
          edges={["top", "left", "right"]}
        >
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <AuthWrapper>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="auth" options={{ headerShown: false }} />
                <Stack.Screen
                  name="onboarding"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="scan/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="scan/results"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(social)/community"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(social)/news"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(social)/news-detail"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(social)/add-community-post"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(chatbot)/chatbot"
                  options={{ headerShown: false }}
                />
              </Stack>
            </AuthWrapper>
            <StatusBar style="dark" />
          </ThemeProvider>
        </SafeAreaView>
      </OnboardingProvider>
    </AuthProvider>
  );
}
