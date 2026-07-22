// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALpN-YE7t9hBeTiCdnbPBwQxB9V6gVDpY",
  authDomain: "smart-mess-fe984.firebaseapp.com",
  projectId: "smart-mess-fe984",
  storageBucket: "smart-mess-fe984.firebasestorage.app",
  messagingSenderId: "815399640895",
  appId: "1:815399640895:web:aefe944501bc8cc485bd8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const db = getFirestore(app)
export  const auth = getAuth(app)