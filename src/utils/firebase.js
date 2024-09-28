import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "pineapple-2c58c.firebaseapp.com",
  projectId: "pineapple-2c58c",
  storageBucket: "pineapple-2c58c.appspot.com",
  messagingSenderId: "747802978349",
  appId: "1:747802978349:web:17c9ded36375f77c1a30a4",
  measurementId: "G-9ZH595N75J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);