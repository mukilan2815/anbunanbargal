import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvFpjvv06nHE73poEUuDEAQzBI-gwRCds",
  authDomain: "anbunanbargal-168a3.firebaseapp.com",
  projectId: "anbunanbargal-168a3",
  storageBucket: "anbunanbargal-168a3.appspot.com",
  messagingSenderId: "253254528156",
  appId: "1:253254528156:web:df05ef69932bf4977f9159",
  measurementId: "G-JHSPZD5QVN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
