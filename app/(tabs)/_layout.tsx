import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#16a34a",
        tabBarInactiveTintColor: "#64748b",
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
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
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingBottom: 8,
    paddingTop: 8,
    height: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  tabBarIcon: {
    marginTop: 4,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 12,
    minWidth: 40,
    minHeight: 40,
  },
  activeIconContainer: {
    backgroundColor: "#dcfce7",
    shadowColor: "#16a34a",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
