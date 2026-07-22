// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYkx0Z38Zj-DHGS1lMh0DG-1x4mXVfwpw",
  authDomain: "college-event-e2611.firebaseapp.com",
  projectId: "college-event-e2611",
  storageBucket: "college-event-e2611.firebasestorage.app",
  messagingSenderId: "227849859706",
  appId: "1:227849859706:web:acb2374c88d27313ba81c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export  const db = getFirestore(app)
export  const auth = getAuth(app)