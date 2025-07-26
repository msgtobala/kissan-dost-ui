// auth/AuthProvider.tsx

import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../config/firebase";
import firestoreService from "../services/firestoreService";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isOnboardingComplete: boolean;
  setIsOnboardingComplete: (complete: boolean) => void;
  checkOnboardingStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const checkOnboardingCompletion = async (userId: string) => {
    try {
      const profile = await firestoreService.getUserProfile(userId);
      setIsOnboardingComplete(!!profile);
    } catch (err) {
      console.error("Error checking onboarding status:", err);
      setIsOnboardingComplete(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log("Current user", currentUser);
      if (currentUser) {
        await checkOnboardingCompletion(currentUser.uid);
      } else {
        setIsOnboardingComplete(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (
    email: string,
    password: string,
    displayName?: string
  ) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: displayName || "",
      createdAt: new Date().toISOString(),
    });
  };

  const logout = async () => {
    await signOut(auth);
    setIsOnboardingComplete(false);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const checkOnboardingStatus = async () => {
    if (user) {
      await checkOnboardingCompletion(user.uid);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        logout,
        resetPassword,
        isOnboardingComplete,
        setIsOnboardingComplete,
        checkOnboardingStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
