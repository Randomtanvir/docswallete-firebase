// Import the functions you need from the SDKs you need

import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGZWGNxefnP2xY3C87zbIXn7jXb9b39aw",
  authDomain: "doscwallete.firebaseapp.com",
  projectId: "doscwallete",
  storageBucket: "doscwallete.firebasestorage.app",
  messagingSenderId: "965030322089",
  appId: "1:965030322089:web:027a759e125475aed7eeb8",
  measurementId: "G-28WWQ6DT7J",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
export { db };
