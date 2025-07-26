// app/AuthWrapper.tsx
import { useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isOnboardingComplete } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "auth";
    const inOnboardingGroup = segments[0] === "onboarding";

    console.log("Index: Current state", {
      user: user ? "exists" : "null",
      isOnboardingComplete,
    });

    if (!user && !inAuthGroup) {
      console.log("Index: No user, redirecting to login");
      router.replace("/auth/login");
    } else if (user && inAuthGroup) {
      console.log(
        "Index: Authenticated user but in auth route, redirecting to home"
      );
      router.replace("/home");
    } else if (user && !inOnboardingGroup && !isOnboardingComplete) {
      console.log("Index: User not onboarded, redirecting to onboarding");
      router.replace("/onboarding");
    } else if (user && inOnboardingGroup && isOnboardingComplete) {
      console.log("Index: Onboarding complete, redirecting to home");
      router.replace("/home");
    }
  }, [user, loading, isOnboardingComplete, segments, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}
