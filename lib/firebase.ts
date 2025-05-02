import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyARFPA7XwVLMSF1rfzLU6f-PXXR2RnvHD8",
  authDomain: "jusrislensai.firebaseapp.com",
  projectId: "jusrislensai",
  storageBucket: "jusrislensai.firebasestorage.app",
  messagingSenderId: "561956136683",
  appId: "1:561956136683:web:4b975539aa05ffd9c4c0ae",
  measurementId: "G-KMWG0LX0W6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);