// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiTa2iv7wHAfu5kSxFnIBG72KW7rTunXw",
  authDomain: "aitripplanner-5c396.firebaseapp.com",
  projectId: "aitripplanner-5c396",
  storageBucket: "aitripplanner-5c396.firebasestorage.app",
  messagingSenderId: "186434595871",
  appId: "1:186434595871:web:116ed98341898f837e392a",
  measurementId: "G-SC3002SYBW"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app);
