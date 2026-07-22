import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmyMtRuA41Vf0R-4bsk5ChU2ntpUFcWLI",
  authDomain: "art-gallery-fb2ef.firebaseapp.com",
  projectId: "art-gallery-fb2ef",
  storageBucket: "art-gallery-fb2ef.firebasestorage.app",
  messagingSenderId: "711527306299",
  appId: "1:711527306299:web:5e5f304ed6a9dd5902f81e"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);