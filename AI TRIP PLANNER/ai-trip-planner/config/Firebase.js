import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,signInWithPopup } from "firebase/auth";
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
export const app = initializeApp(firebaseConfig);

// set up firebase auth
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {auth,provider,signInWithPopup};