import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new tab navigation
    router.replace("/(tabs)/dashboard");
  }, [router]);

  return null;
}
