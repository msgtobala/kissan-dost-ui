import { PesticidePreference, SoilType } from "@/services/firestoreService";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface OnboardingData {
  age: number;
  gender: "Male" | "Female" | "Other";
  phoneNumber: string;
  state: string;
  village: string;
  taluk: string;
  address: string;
  soilType: SoilType;
  primaryCrop: string;
  seasonalCrops: string[];
  pesticidePreference: PesticidePreference;
}

interface OnboardingContextType {
  onboardingData: Partial<OnboardingData>;
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  clearOnboardingData: () => void;
  isOnboardingComplete: boolean;
  setIsOnboardingComplete: (complete: boolean) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};

interface OnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
}) => {
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>(
    {}
  );
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData((prev) => ({ ...prev, ...data }));
  };

  const clearOnboardingData = () => {
    setOnboardingData({});
    setIsOnboardingComplete(false);
  };

  const value: OnboardingContextType = {
    onboardingData,
    updateOnboardingData,
    clearOnboardingData,
    isOnboardingComplete,
    setIsOnboardingComplete,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};
