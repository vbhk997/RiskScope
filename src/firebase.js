//import functions needed
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//add config values from website
const firebaseConfig = {
    apiKey: "AIzaSyBvK1kgdhBEgZJ5Z-k0GFQXIaZMsksYXUs",
    authDomain: "riskscope-6ebd0.firebaseapp.com",
    projectId: "riskscope-6ebd0",
    storageBucket: "riskscope-6ebd0.firebasestorage.app",
    messagingSenderId: "953263960733",
    appId: "1:953263960733:web:4168318490816b3efd9a74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);