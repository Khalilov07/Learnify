// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1R_w8RKP24kLUn8ARkDrJHxIW0vMmZwE",
  authDomain: "elina-s.firebaseapp.com",
  projectId: "elina-s",
  storageBucket: "elina-s.appspot.com",
  messagingSenderId: "491374385824",
  appId: "1:491374385824:web:ca460449378b6dbfca87c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)