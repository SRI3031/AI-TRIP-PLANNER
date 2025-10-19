import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCkbuSgcTR2JsBla_SBlq0h2gz0pSNVql0",
  authDomain: "ai-travel-project-e97f4.firebaseapp.com",
  projectId: "ai-travel-project-e97f4",
  storageBucket: "ai-travel-project-e97f4.firebasestorage.app",
  messagingSenderId: "497064224378",
  appId: "1:497064224378:web:26fe5f9dcd0906bbaafdc3",
  measurementId: "G-K7WY5Z9BX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
export {db};