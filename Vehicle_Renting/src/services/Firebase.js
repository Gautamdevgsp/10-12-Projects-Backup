import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUD42ARqcqAoNIPui42Z5BpP6qkJtWLS8",
  authDomain: "vehicle-renting-6cf02.firebaseapp.com",
  projectId: "vehicle-renting-6cf02",
  storageBucket: "vehicle-renting-6cf02.firebasestorage.app",
  messagingSenderId: "588055872934",
  appId: "1:588055872934:web:4afc08832b4acc603cbb67"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
