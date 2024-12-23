import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "pineapple-fd96c.firebaseapp.com",
  projectId: "pineapple-fd96c",
  storageBucket: "pineapple-fd96c.firebasestorage.app",
  messagingSenderId: "944344941305",
  appId: "1:944344941305:web:9c28ed02bcafb6091ed828",
  measurementId: "G-EYWYFYNB86"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);