import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Index() {
  const { user, loading, isOnboardingComplete } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      console.log("Index: Still loading, waiting...");
      return;
    }

    if (user && isOnboardingComplete) {
      console.log(
        "Index: User exists and onboarding complete, redirecting to dashboard"
      );
      router.replace("/(tabs)/dashboard");
    } else if (user && !isOnboardingComplete) {
      console.log(
        "Index: User exists but onboarding not complete, redirecting to onboarding"
      );
      router.replace("/onboarding/index" as any);
    } else if (!user) {
      console.log("Index: No user, redirecting to login");
      router.replace("/auth/login");
    }
  }, [user, loading, isOnboardingComplete, router]);

  return null;
}
