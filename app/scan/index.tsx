import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db, storage } from "../../config/firebase";
import { Colors } from "../../constants/Colors";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

const { width, height } = Dimensions.get("window");

export default function PlantScanScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const cameraRef = useRef<any>(null);
  const { user } = useAuth();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>
            We need your permission to show the camera
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef.current && !isCapturing && !isUploading) {
      setIsCapturing(true);
      setIsUploading(true);
      setUploadProgress(0);
      try {
        setUploadProgress(10);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
        });
        setUploadProgress(30);
        if (!user) {
          Alert.alert("Error", "User not authenticated");
          setIsCapturing(false);
          setIsUploading(false);
          setUploadProgress(0);
          return;
        }
        // Upload image to Firebase Storage
        setUploadProgress(50);
        const response = await fetch(photo.uri);
        const blob = await response.blob();
        const imageId = Date.now().toString();
        const storageRef = ref(
          storage,
          `users/${user.uid}/plant-images/${imageId}.jpg`
        );
        await uploadBytes(storageRef, blob);
        setUploadProgress(80);
        const downloadURL = await getDownloadURL(storageRef);
        // Store download URL in Firestore
        const imageDocRef = doc(db, `users/${user.uid}/plant-images`, imageId);
        await setDoc(imageDocRef, {
          url: downloadURL,
          createdAt: serverTimestamp(),
        });
        setUploadProgress(100);
        router.push({
          pathname: "/scan/results",
          params: { imageUri: photo.uri },
        });
      } catch (error) {
        Alert.alert("Error", "Failed to capture or upload image");
      } finally {
        setIsCapturing(false);
        setIsUploading(false);
        setUploadProgress(0);
      }
    }
  };

  return (
    <CameraView
      ref={cameraRef}
      style={StyleSheet.absoluteFill}
      facing={facing}
      ratio="16:9"
    >
      {/* Header */}
      <View style={styles.header} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={Colors.light.background}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan your plant</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Camera Overlay */}
      <View style={styles.overlay} pointerEvents="box-none">
        {/* Corner Brackets */}
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls} pointerEvents="box-none">
        <View style={styles.controlRow}>
          {/* Left Icon - Profile/Collection */}
          <TouchableOpacity style={styles.controlButton}>
            <View style={styles.controlIconContainer}>
              <MaterialCommunityIcons
                name="account"
                size={24}
                color={Colors.light.success}
              />
            </View>
          </TouchableOpacity>

          {/* Center Shutter Button */}
          <TouchableOpacity
            style={[
              styles.shutterButton,
              (isCapturing || isUploading) && styles.shutterButtonDisabled,
            ]}
            onPress={takePicture}
            disabled={isCapturing || isUploading}
            activeOpacity={0.8}
          >
            <View style={styles.shutterButtonOuter}>
              <View style={styles.shutterButtonInner}>
                {isUploading ? (
                  <ActivityIndicator
                    size="small"
                    color={Colors.light.primary}
                  />
                ) : (
                  <MaterialIcons
                    name="camera-alt"
                    size={28}
                    color={Colors.light.primary}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>

          {/* Right Icon - Info */}
          <TouchableOpacity style={styles.controlButton}>
            <View style={styles.controlIconContainer}>
              <MaterialIcons
                name="info"
                size={24}
                color={Colors.light.success}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* Loading Overlay */}
      {(isCapturing || isUploading) && (
        <View style={styles.loadingOverlay} pointerEvents="box-none">
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.light.primary} />
            <Text style={styles.loadingText}>
              {isCapturing ? "Capturing image..." : "Uploading to cloud..."}
            </Text>
            {isUploading && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${uploadProgress}%` },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{uploadProgress}%</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionTitle: {
    color: Colors.light.primary,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  permissionButton: {
    backgroundColor: Colors.light.success,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: Colors.light.background,
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.light.primary + "CC", // semi-transparent
    zIndex: 2,
  },
  backButton: {
    padding: 8,
    backgroundColor: Colors.light.background + "CC",
    borderRadius: 20,
  },
  headerTitle: {
    color: Colors.light.primary,
    fontSize: 18,
    fontWeight: "600",
  },
  headerSpacer: {
    width: 40,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: Colors.light.primary,
    borderWidth: 3,
  },
  topLeft: {
    top: height * 0.25,
    left: width * 0.1,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRight: {
    top: height * 0.25,
    right: width * 0.1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: height * 0.25,
    left: width * 0.1,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: height * 0.25,
    right: width * 0.1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  scanningLine: {
    position: "absolute",
    top: height * 0.4,
    left: width * 0.1,
    right: width * 0.1,
    height: 2,
    backgroundColor: Colors.light.primary,
  },
  scanningArea: {
    position: "absolute",
    top: height * 0.4,
    left: width * 0.1,
    right: width * 0.1,
    bottom: height * 0.25,
    backgroundColor: Colors.light.primary + "22", // very light overlay
  },
  scanningTextContainer: {
    position: "absolute",
    top: height * 0.75,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  scanningText: {
    color: Colors.light.primary,
    fontSize: 16,
    textAlign: "center",
    backgroundColor: Colors.light.background + "CC",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  bottomControls: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 30,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  controlRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  controlButton: {
    flex: 1,
    alignItems: "center",
  },
  controlIconContainer: {
    backgroundColor: Colors.light.background,
    borderRadius: 25,
    padding: 12,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  shutterButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  shutterButtonDisabled: {
    opacity: 0.6,
  },
  shutterButtonOuter: {
    backgroundColor: Colors.light.background,
    borderRadius: 40,
    padding: 4,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  shutterButtonInner: {
    backgroundColor: Colors.light.background,
    borderRadius: 36,
    padding: 16,
    borderWidth: 3,
    borderColor: Colors.light.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingContainer: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  loadingText: {
    color: Colors.light.primary,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    textAlign: "center",
  },
  progressContainer: {
    marginTop: 16,
    alignItems: "center",
    width: 200,
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: Colors.light.primary + "33",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.light.primary,
    borderRadius: 4,
  },
  progressText: {
    color: Colors.light.primary,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
  },
});
