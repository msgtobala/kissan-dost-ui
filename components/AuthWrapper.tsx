import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "auth";

    if (!user && !inAuthGroup) {
      // Redirect to auth if user is not authenticated
      router.replace("/auth/login");
    } else if (user && inAuthGroup) {
      // User is authenticated but still in auth flow
      // Keep them in auth for now since we only have auth screens
      // You can add a main screen later and redirect there
    }
  }, [user, segments, loading, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}
