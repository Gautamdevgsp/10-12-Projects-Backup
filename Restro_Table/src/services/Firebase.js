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
  apiKey: "AIzaSyA5QOKhj51XRckjdlySOGc56_Ff9tW5Ex8",
  authDomain: "restro-table.firebaseapp.com",
  projectId: "restro-table",
  storageBucket: "restro-table.firebasestorage.app",
  messagingSenderId: "492084230460",
  appId: "1:492084230460:web:0e78b649106cea47714639"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const db = getFirestore(app)
export  const auth = getAuth(app)