// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "@firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbbvlVysSqF-RCmyxE5EPPVY2XLCZ8XYY",
  authDomain: "react-crud-c50b5.firebaseapp.com",
  projectId: "react-crud-c50b5",
  storageBucket: "react-crud-c50b5.appspot.com",
  messagingSenderId: "100757842269",
  appId: "1:100757842269:web:f4f5cc5f4cd8c24032e0b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)