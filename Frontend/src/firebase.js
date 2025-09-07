// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgM3J9mwpmeZucL8pfPOMJi8O0IOmF0hg",
  authDomain: "collabgrow-51527.firebaseapp.com",
  projectId: "collabgrow-51527",
  storageBucket: "collabgrow-51527.firebasestorage.app",
  messagingSenderId: "78498385579",
  appId: "1:78498385579:web:7d3b41553c6b71e65b31ee",
  measurementId: "G-F936JL1SHE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
