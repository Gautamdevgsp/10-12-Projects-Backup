// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBAgQWfgVfOTIXuqLtd2rFGi9iBz08NWko",
  authDomain: "travel-booking-12af1.firebaseapp.com",
  projectId: "travel-booking-12af1",
  storageBucket: "travel-booking-12af1.firebasestorage.app",
  messagingSenderId: "112593691761",
  appId: "1:112593691761:web:256a3c7e80e4e5a0a8a7d0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const db = getFirestore(app)
export  const auth = getAuth(app)