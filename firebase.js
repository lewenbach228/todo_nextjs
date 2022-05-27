// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDxY5lPvTf6ZqW1XH1gpKY6hwCzDzfdO4",
  authDomain: "next-todos-app.firebaseapp.com",
  projectId: "next-todos-app",
  storageBucket: "next-todos-app.appspot.com",
  messagingSenderId: "360729392143",
  appId: "1:360729392143:web:daf313ef3317e961771f7a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
export { db, auth, provider };
