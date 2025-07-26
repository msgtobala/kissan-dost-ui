import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="personal-info" />
      <Stack.Screen name="location" />
      <Stack.Screen name="farming-details" />
      <Stack.Screen name="crop-selection" />
      <Stack.Screen name="pesticide-preference" />
      <Stack.Screen name="complete" />
    </Stack>
  );
}
