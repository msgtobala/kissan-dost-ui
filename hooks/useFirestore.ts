import { useAuth } from "@/contexts/AuthContext";
import firestoreService, {
  Crop,
  WeatherData,
} from "@/services/firestoreService";
import { useEffect, useState } from "react";

export const useCrops = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setCrops([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Subscribe to real-time updates
    const unsubscribe = firestoreService.subscribeToCrops(
      user.uid,
      (cropsData) => {
        setCrops(cropsData);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  const addCrop = async (
    cropData: Omit<Crop, "id" | "userId" | "createdAt" | "updatedAt">
  ) => {
    if (!user) throw new Error("User not authenticated");

    try {
      await firestoreService.addCrop({
        ...cropData,
        userId: user.uid,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add crop");
      throw err;
    }
  };

  const updateCrop = async (cropId: string, updates: Partial<Crop>) => {
    try {
      await firestoreService.updateCrop(cropId, updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update crop");
      throw err;
    }
  };

  const deleteCrop = async (cropId: string) => {
    try {
      await firestoreService.deleteCrop(cropId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete crop");
      throw err;
    }
  };

  return {
    crops,
    loading,
    error,
    addCrop,
    updateCrop,
    deleteCrop,
  };
};

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setWeatherData([]);
      setLoading(false);
      return;
    }

    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await firestoreService.getWeatherDataByUser(user.uid);
        setWeatherData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch weather data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [user]);

  const addWeatherData = async (data: Omit<WeatherData, "id" | "userId">) => {
    if (!user) throw new Error("User not authenticated");

    try {
      await firestoreService.addWeatherData({
        ...data,
        userId: user.uid,
      });
      // Refresh the data
      const updatedData = await firestoreService.getWeatherDataByUser(user.uid);
      setWeatherData(updatedData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to add weather data"
      );
      throw err;
    }
  };

  return {
    weatherData,
    loading,
    error,
    addWeatherData,
  };
};
