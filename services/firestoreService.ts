import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

// Types
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

class FirestoreService {
  // Crops Collection
  async addCrop(
    cropData: Omit<Crop, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, "crops"), {
        ...cropData,
        plantedDate: Timestamp.fromDate(cropData.plantedDate),
        expectedHarvest: Timestamp.fromDate(cropData.expectedHarvest),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding crop:", error);
      throw error;
    }
  }

  async getCropsByUser(userId: string): Promise<Crop[]> {
    try {
      const q = query(
        collection(db, "crops"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        plantedDate: doc.data().plantedDate.toDate(),
        expectedHarvest: doc.data().expectedHarvest.toDate(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Crop[];
    } catch (error) {
      console.error("Error getting crops:", error);
      throw error;
    }
  }

  async updateCrop(cropId: string, updates: Partial<Crop>): Promise<void> {
    try {
      const cropRef = doc(db, "crops", cropId);
      const updateData: any = {
        ...updates,
        updatedAt: Timestamp.now(),
      };

      // Convert dates to Timestamps if they exist
      if (updates.plantedDate) {
        updateData.plantedDate = Timestamp.fromDate(updates.plantedDate);
      }
      if (updates.expectedHarvest) {
        updateData.expectedHarvest = Timestamp.fromDate(
          updates.expectedHarvest
        );
      }

      await updateDoc(cropRef, updateData);
    } catch (error) {
      console.error("Error updating crop:", error);
      throw error;
    }
  }

  async deleteCrop(cropId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, "crops", cropId));
    } catch (error) {
      console.error("Error deleting crop:", error);
      throw error;
    }
  }

  // Weather Data Collection
  async addWeatherData(weatherData: Omit<WeatherData, "id">): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, "weather"), {
        ...weatherData,
        date: Timestamp.fromDate(weatherData.date),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding weather data:", error);
      throw error;
    }
  }

  async getWeatherDataByUser(
    userId: string,
    limit: number = 10
  ): Promise<WeatherData[]> {
    try {
      const q = query(
        collection(db, "weather"),
        where("userId", "==", userId),
        orderBy("date", "desc")
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.slice(0, limit).map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
      })) as WeatherData[];
    } catch (error) {
      console.error("Error getting weather data:", error);
      throw error;
    }
  }

  // Real-time listeners
  subscribeToCrops(
    userId: string,
    callback: (crops: Crop[]) => void
  ): () => void {
    const q = query(
      collection(db, "crops"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (querySnapshot) => {
      const crops = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        plantedDate: doc.data().plantedDate.toDate(),
        expectedHarvest: doc.data().expectedHarvest.toDate(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Crop[];

      callback(crops);
    });
  }
}

export default new FirestoreService();
