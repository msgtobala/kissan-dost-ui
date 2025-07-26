import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { getCommunityPosts } from "@/services/communityService";
import type { CommunityPost } from "@/types/community";

// Mock data based on CommunityPost type

const Community = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);

  useEffect(() => {
    const handleGetPosts = async () => {
      const posts = await getCommunityPosts();
      setPosts(posts);
    };
    handleGetPosts();
  }, []);

  const formatTimeAgo = (date: any) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const renderPost = ({ item }: { item: CommunityPost }) => {
    console.log("Post likes:", item.likes, "Type:", typeof item.likes);
    return (
      <View
        style={[
          styles.postContainer,
          {
            borderColor: "#e1e8ed",
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 6,
          },
        ]}
      >
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <View style={styles.userAvatar}>
              <ThemedText style={styles.userAvatarText}>
                {item.userName.charAt(0).toUpperCase()}
              </ThemedText>
            </View>
            <View style={styles.userDetails}>
              <ThemedText style={[styles.userName, { color: "#275d63" }]}>
                {item.userName}
              </ThemedText>
              <ThemedText style={[styles.timeAgo, { color: "#8e9196" }]}>
                {formatTimeAgo(item.createdAt.toDate())}
              </ThemedText>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.postContent}>
          <ThemedText style={[styles.postTitle, { color: "#275d63" }]}>
            {item.title}
          </ThemedText>
          <ThemedText
            style={[styles.postText, { color: "#4a5568" }]}
            numberOfLines={3}
          >
            {item.content}
          </ThemedText>
        </TouchableOpacity>

        {/* Post Image */}
        <View style={styles.postImageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.postImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.postFooter}>
          <View style={styles.likeSection}>
            <TouchableOpacity style={styles.likeButton}>
              <Ionicons name="heart" size={20} color="#e74c3c" />
              <ThemedText style={[styles.likeCount, { color: "#275d63" }]}>
                {item.likes || 0}
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={16} color="#687076" />
              <ThemedText style={[styles.actionText, { color: "#687076" }]}>
                12
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-outline" size={16} color="#687076" />
              <ThemedText style={[styles.actionText, { color: "#687076" }]}>
                Share
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="bookmark-outline" size={16} color="#687076" />
              <ThemedText style={[styles.actionText, { color: "#687076" }]}>
                Save
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tagsContainer}>
          <View style={[styles.tag, { backgroundColor: "#effbf4" }]}>
            <ThemedText style={[styles.tagText, { color: "#275d63" }]}>
              Tomatoes
            </ThemedText>
          </View>
          <View style={[styles.tag, { backgroundColor: "#effbf4" }]}>
            <ThemedText style={[styles.tagText, { color: "#275d63" }]}>
              Disease
            </ThemedText>
          </View>
          <View style={[styles.tag, { backgroundColor: "#effbf4" }]}>
            <ThemedText style={[styles.tagText, { color: "#275d63" }]}>
              Organic
            </ThemedText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: "#F8F9FA" }]}>
      <View style={[styles.header, { borderBottomColor: "#e1e8ed" }]}>
        <ThemedText style={[styles.headerTitle, { color: "#275d63" }]}>
          Community
        </ThemedText>
        <TouchableOpacity
          style={[
            styles.addButton,
            {
              backgroundColor: "#275d63",
              shadowColor: "#275d63",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            },
          ]}
          onPress={() => router.push("/(social)/add-community-post")}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={[styles.filterBar, { borderBottomColor: "#e1e8ed" }]}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor: "#275d63",
              shadowColor: "#275d63",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            },
          ]}
        >
          <ThemedText style={[styles.filterText, { color: "#fff" }]}>
            Latest
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 4,
            },
          ]}
        >
          <ThemedText style={[styles.filterText, { color: "#275d63" }]}>
            Popular
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 4,
            },
          ]}
        >
          <ThemedText style={[styles.filterText, { color: "#275d63" }]}>
            Unanswered
          </ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.cid}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.postsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
    lineHeight: 36,
    includeFontPadding: false,
    textAlignVertical: "top",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  filterBar: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
  },
  activeFilter: {
    // Will be applied via inline styles
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
  },
  postsList: {
    padding: 15,
  },
  postContainer: {
    marginBottom: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#275d63",
    justifyContent: "center",
    alignItems: "center",
  },
  userAvatarText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  timeAgo: {
    fontSize: 12,
    marginTop: 2,
  },
  moreButton: {
    padding: 4,
  },
  postContent: {
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    lineHeight: 24,
  },
  postText: {
    fontSize: 14,
    lineHeight: 20,
  },
  postImageContainer: {
    marginVertical: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  likeSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#fff5f5",
  },
  likeCount: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  actionText: {
    fontSize: 12,
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },
});

export default Community;
