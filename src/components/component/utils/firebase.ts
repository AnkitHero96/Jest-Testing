// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH0ixmjxyYfPoWt3JU0gronQWLJLqVoKA",
  authDomain: "react-auth-1e723.firebaseapp.com",
  projectId: "react-auth-1e723",
  storageBucket: "react-auth-1e723.appspot.com",
  messagingSenderId: "537850249132",
  appId: "1:537850249132:web:d1f0ffead0531385cf0409"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;