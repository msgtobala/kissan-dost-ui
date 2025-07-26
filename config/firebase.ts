import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA_-5A-5jI0WlHa5WykcAgNYIYtqtyZCc",
  authDomain: "kissan-dost-8333f.firebaseapp.com",
  projectId: "kissan-dost-8333f",
  storageBucket: "kissan-dost-8333f.firebasestorage.app",
  messagingSenderId: "528893316203",
  appId: "1:528893316203:web:ce753fc51023ddad24f52e",
  measurementId: "G-B3S3Z57EG9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { auth, db, storage };
export default app;
