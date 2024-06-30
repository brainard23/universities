// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDKa1uRl3sbfdVNIB4iWaXEpcJYk9cVnis",
  authDomain: "universities-c8148.firebaseapp.com",
  projectId: "universities-c8148",
  storageBucket: "universities-c8148.appspot.com",
  messagingSenderId: "4600449257",
  appId: "1:4600449257:web:82b677e5e9db96a48e0878",
  measurementId: "G-1ZH8MJYELZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
