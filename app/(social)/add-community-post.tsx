import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/contexts/AuthContext";
import { addCommunityPost } from "@/services/communityService";
import type { CommunityPost } from "@/types/community";

const AddCommunityPost = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Camera permission is required to take photos."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take photo. Please try again.");
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert("Add Image", "Choose how you want to add an image", [
      {
        text: "Camera",
        onPress: takePhoto,
      },
      {
        text: "Gallery",
        onPress: pickImage,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to create a post");
      return;
    }

    if (!title.trim() || !content.trim()) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const postData: Omit<CommunityPost, "cid" | "createdAt"> = {
        uid: user.uid,
        image:
          selectedImage ||
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
        title: title.trim(),
        content: content.trim(),
        userName: user.displayName || "Anonymous Farmer",
        likes: 0,
      };

      await addCommunityPost(postData);

      Alert.alert("Success", "Your post has been created successfully!", [
        {
          text: "OK",
          onPress: () => router.replace("/(social)/community"),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to create post. Please try again.");
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (title.trim() || content.trim() || selectedImage) {
      Alert.alert(
        "Discard Changes",
        "Are you sure you want to discard your changes?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <ThemedText style={styles.cancelText}>Cancel</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>New Post</ThemedText>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={[
            styles.postButton,
            {
              opacity: isSubmitting ? 0.6 : 1,
            },
          ]}
        >
          <ThemedText style={styles.postButtonText}>
            {isSubmitting ? "Posting..." : "Post"}
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="What's your farming question or tip?"
            placeholderTextColor="#8e9196"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
            multiline
          />
          <ThemedText style={styles.characterCount}>
            {title.length}/100
          </ThemedText>
        </View>

        {/* Content Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.contentInput}
            placeholder="Share your farming experience, ask questions, or provide tips to help other farmers..."
            placeholderTextColor="#8e9196"
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
            maxLength={1000}
          />
          <ThemedText style={styles.characterCount}>
            {content.length}/1000
          </ThemedText>
        </View>

        {/* Image Section */}
        <View style={styles.imageSection}>
          <ThemedText style={styles.sectionTitle}>
            Add Image (Optional)
          </ThemedText>

          {selectedImage ? (
            <View style={styles.selectedImageContainer}>
              <Image
                source={{ uri: selectedImage }}
                style={styles.selectedImage}
              />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={removeImage}
              >
                <Ionicons name="close-circle" size={24} color="#e74c3c" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={showImagePickerOptions}
            >
              <Ionicons name="camera" size={32} color="#275d63" />
              <ThemedText style={styles.imagePickerText}>Add Photo</ThemedText>
              <ThemedText style={styles.imagePickerSubtext}>
                Camera or Gallery
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>

        {/* Tips Section */}
        <View style={styles.tipsContainer}>
          <View style={styles.tipsHeader}>
            <Ionicons name="bulb" size={20} color="#275d63" />
            <ThemedText style={styles.tipsTitle}>
              Tips for better posts
            </ThemedText>
          </View>
          <ThemedText style={styles.tipText}>
            • Be specific about your farming challenge
          </ThemedText>
          <ThemedText style={styles.tipText}>
            • Include relevant details like crop type, season
          </ThemedText>
          <ThemedText style={styles.tipText}>
            • Share your location if relevant
          </ThemedText>
          <ThemedText style={styles.tipText}>
            • Add images to make your post more engaging
          </ThemedText>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e8ed",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    fontSize: 16,
    color: "#687076",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#275d63",
  },
  postButton: {
    backgroundColor: "#275d63",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#275d63",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: "600",
    color: "#275d63",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e1e8ed",
    minHeight: 60,
    textAlignVertical: "top",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contentInput: {
    fontSize: 16,
    color: "#4a5568",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e1e8ed",
    minHeight: 120,
    textAlignVertical: "top",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  characterCount: {
    fontSize: 12,
    color: "#8e9196",
    textAlign: "right",
    marginTop: 8,
  },
  imageSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#275d63",
    marginBottom: 12,
  },
  imagePickerButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#e1e8ed",
    borderStyle: "dashed",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePickerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#275d63",
    marginTop: 8,
  },
  imagePickerSubtext: {
    fontSize: 14,
    color: "#8e9196",
    marginTop: 4,
  },
  selectedImageContainer: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedImage: {
    width: "100%",
    height: 200,
    borderRadius: 16,
  },
  removeImageButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 4,
  },
  tipsContainer: {
    backgroundColor: "#effbf4",
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#275d63",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#275d63",
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    color: "#4a5568",
    marginBottom: 6,
    lineHeight: 20,
  },
});

export default AddCommunityPost;
