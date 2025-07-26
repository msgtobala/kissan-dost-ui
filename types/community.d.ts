import { Timestamp } from "firebase/firestore";

export type CommunityPost = {
  cid: string;
  uid: string;
  image: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  userName: string;
  likes: number;
};
