// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCwQC-Od5s52U1nKwGMG1yzkYxLjWyl5XY",
  authDomain: "school-14210.firebaseapp.com",
  projectId: "school-14210",
  storageBucket: "school-14210.appspot.com",
  messagingSenderId: "437951683063",
  appId: "1:437951683063:web:8ddb7696a4830d145cf6f2",
  measurementId: "G-4LQSRD8ZQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
