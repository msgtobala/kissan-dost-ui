import { useAuth } from "@/contexts/AuthContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function DashboardScreen() {
  const { logout, user } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const displayName = user?.displayName || "";
  const firstLetter = displayName.charAt(0).toUpperCase();

  const handleProfilePress = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsHamburgerMenuOpen(false); // Close hamburger menu when profile is opened
  };

  const handleHamburgerPress = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
    setIsProfileMenuOpen(false); // Close profile menu when hamburger is opened
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleMenuOptionPress = (option: string) => {
    console.log(`Selected: ${option}`);
    setIsHamburgerMenuOpen(false);
    // Add navigation logic here for News and Community
  };

  return (
    <View style={styles.container}>
      {/* Top Row: Avatar, Name, Hamburger */}
      <View style={styles.topRow}>
        <View style={styles.avatarAndName}>
          <TouchableOpacity onPress={handleProfilePress}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{firstLetter}</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.helloText}>Hello</Text>
            <Text style={styles.nameText}>{displayName}</Text>
          </View>
        </View>
        {!isHamburgerMenuOpen ? (
          <TouchableOpacity
            style={styles.hamburgerButton}
            onPress={handleHamburgerPress}
          >
            <MaterialIcons name="menu" size={28} color="#2d3748" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.hamburgerButton}
            onPress={handleHamburgerPress}
          >
            <MaterialIcons name="close" size={28} color="#2d3748" />
          </TouchableOpacity>
        )}
      </View>

      {/* Profile Menu */}
      {isProfileMenuOpen && (
        <View style={styles.profileMenu}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialIcons name="logout" size={20} color="#dc2626" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Hamburger Menu Dropdown */}
      {isHamburgerMenuOpen && (
        <View style={styles.hamburgerMenu}>
          <TouchableOpacity
            style={styles.menuOption}
            onPress={() => handleMenuOptionPress("News")}
          >
            <MaterialIcons name="article" size={20} color="#374151" />
            <Text style={styles.menuOptionText}>News</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuOption}
            onPress={() => handleMenuOptionPress("Community")}
          >
            <MaterialIcons name="people" size={20} color="#374151" />
            <Text style={styles.menuOptionText}>Community</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Welcome Message */}
      <Text style={styles.welcomeText}>
        What Service are you{"\n"}looking for?
      </Text>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <MaterialIcons
          name="search"
          size={22}
          color="#94a3b8"
          style={{ marginLeft: 10 }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#94a3b8"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  avatarAndName: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e0e7ef",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2d3748",
  },
  helloText: {
    color: "#16a34a",
    fontSize: 14,
    fontWeight: "600",
  },
  nameText: {
    color: "#2d3748",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -2,
  },
  hamburgerButton: {
    padding: 8,
  },
  profileMenu: {
    position: "absolute",
    top: 100,
    left: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  hamburgerMenu: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
    minWidth: 140,
  },
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  menuOptionText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#fef2f2",
  },
  logoutText: {
    color: "#dc2626",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  welcomeText: {
    fontSize: 22,
    color: "#134e4a",
    fontWeight: "700",
    marginBottom: 24,
    marginLeft: 2,
    lineHeight: 30,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 16,
    height: 48,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: "#22223b",
    backgroundColor: "transparent",
    paddingHorizontal: 12,
  },
});
