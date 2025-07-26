import { db } from "@/config/firebase";
import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";

export interface Crop {
  id?: string;
  name: string;
  status: "Planted" | "Growing" | "Flowering" | "Harvested";
  plantedDate: Date;
  expectedHarvest: Date;
  health: "Poor" | "Good" | "Excellent";
  area: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface WeatherData {
  id?: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  date: Date;
  location: string;
  userId: string;
}

export interface UserProfile {
  id?: string;
  userId: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  state: string;
  village: string;
  taluk: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  phoneNumber: string;
  soilType: SoilType;
  primaryCrop: string;
  seasonalCrops: string[];
  pesticidePreference: PesticidePreference;
  isOnboardingComplete: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type SoilType =
  | "Alluvial"
  | "Black"
  | "Red"
  | "Laterite"
  | "Mountain"
  | "Desert"
  | "Peaty"
  | "Saline";

export type PesticidePreference = "Organic" | "Chemical" | "Mixed" | "None";

class FirestoreService {
  // User Profile Collection
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      console.log("FirestoreService: Getting user profile for userId:", userId);
      const docSnap = await getDoc(doc(db, "userProfiles", userId));

      console.log("FirestoreService: Document exists:", docSnap.exists);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("FirestoreService: Document data:", data);
        const userProfile = {
          id: docSnap.id,
          ...data,
          createdAt: data?.createdAt?.toDate(),
          updatedAt: data?.updatedAt?.toDate(),
        } as UserProfile;
        console.log("FirestoreService: Returning user profile:", userProfile);
        return userProfile;
      }
      console.log("FirestoreService: No document found, returning null");
      return null;
    } catch (error) {
      console.error("FirestoreService: Error getting user profile:", error);
      throw error;
    }
  }

  async createUserProfile(
    profileData: Omit<UserProfile, "id" | "createdAt" | "updatedAt">
  ): Promise<void> {
    try {
      await setDoc(doc(db, "userProfiles", profileData.userId), {
        ...profileData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  }

  async markOnboardingComplete(userId: string): Promise<void> {
    try {
      await updateDoc(doc(db, "userProfiles", userId), {
        isOnboardingComplete: true,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error marking onboarding complete:", error);
      throw error;
    }
  }
}

export default new FirestoreService();
