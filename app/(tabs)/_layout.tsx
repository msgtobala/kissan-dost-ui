import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, Tabs } from "expo-router";
import React, { useRef } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

export default function TabLayout() {
  // FAB animation
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFabPressIn = () => {
    router.push("/(chatbot)/chatbot");
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handleFabPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: "#16a34a",
          tabBarInactiveTintColor: "#94a3b8",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIconStyle: styles.tabBarIcon,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, focused }) => (
              <View
                style={[
                  styles.iconContainer,
                  focused && styles.activeIconContainer,
                ]}
              >
                <MaterialIcons name="dashboard" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="crop"
          options={{
            title: "Crop",
            tabBarIcon: ({ color, focused }) => (
              <View
                style={[
                  styles.iconContainer,
                  focused && styles.activeIconContainer,
                ]}
              >
                <MaterialIcons name="agriculture" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="cost"
          options={{
            title: "Cost",
            tabBarIcon: ({ color, focused }) => (
              <View
                style={[
                  styles.iconContainer,
                  focused && styles.activeIconContainer,
                ]}
              >
                <MaterialIcons
                  name="account-balance-wallet"
                  size={24}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="alert"
          options={{
            title: "Alert",
            tabBarIcon: ({ color, focused }) => (
              <View
                style={[
                  styles.iconContainer,
                  focused && styles.activeIconContainer,
                ]}
              >
                <MaterialIcons name="notifications" size={24} color={color} />
              </View>
            ),
          }}
        />
      </Tabs>

      {/* Floating Chatbot Button */}
      <View style={styles.fabContainer} pointerEvents="box-none">
        <Animated.View
          style={[styles.fabButton, { transform: [{ scale: scaleAnim }] }]}
        >
          <Pressable
            onPressIn={handleFabPressIn}
            onPressOut={handleFabPressOut}
            style={styles.fabPressable}
            android_ripple={{
              color: "rgba(255,255,255,0.3)",
              borderless: true,
            }}
          >
            <MaterialIcons name="smart-toy" size={28} color="#fff" />
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ffffff",
    paddingBottom: 12,
    paddingTop: 8,
    height: 88,
    borderTopWidth: 0,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 4,
  },
  tabBarIcon: {
    marginTop: 2,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 8,
    minWidth: 40,
    minHeight: 40,
  },
  activeIconContainer: {
    backgroundColor: "#f0fdf4",
    borderRadius: 50,
  },
  fabContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 60,
    alignItems: "center",
    zIndex: 100,
    pointerEvents: "box-none",
  },
  fabButton: {
    width: 66,
    height: 66,
    borderRadius: 50,
    backgroundColor: "#16a34a",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#16a34a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  fabPressable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
