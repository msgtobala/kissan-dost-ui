import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/config/firebase";
import type { CommunityPost } from "@/types/community";

const COLLECTION_NAME = "community";

export const getCommunityPosts = async (): Promise<CommunityPost[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    const posts: CommunityPost[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({
        cid: doc.id,
        uid: data.uid,
        image: data.image,
        title: data.title,
        content: data.content,
        createdAt: data.createdAt,
        userName: data.userName,
        likes: data.likes || 0,
      });
    });

    return posts;
  } catch (error) {
    console.error("Error fetching community posts:", error);
    throw error;
  }
};

export const addCommunityPost = async (
  postData: Omit<CommunityPost, "cid" | "createdAt">
): Promise<void> => {
  try {
    const docRef = doc(collection(db, COLLECTION_NAME));
    await setDoc(docRef, {
      ...postData,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding community post:", error);
    throw error;
  }
};

export const updateCommunityPost = async (
  postId: string,
  updates: Partial<CommunityPost>
): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, postId);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating community post:", error);
    throw error;
  }
};

export const likeCommunityPost = async (postId: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, postId);
    await updateDoc(docRef, {
      likes: (await getDoc(docRef)).data()?.likes + 1 || 1,
    });
  } catch (error) {
    console.error("Error liking community post:", error);
    throw error;
  }
};
