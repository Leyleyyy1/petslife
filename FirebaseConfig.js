import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const FirebaseConfig = {
    apiKey: "AIzaSyBgVkv9TyIGhNpDEPrzH3x0lcbHuVE2Yuw",
    authDomain: "petslife-131e3.firebaseapp.com",
    projectId: "petslife-131e3",
    storageBucket: "petslife-131e3.firebasestorage.app",
    messagingSenderId: "921954519435",
    appId: "1:921954519435:web:4ed5115ce39e8864a6878e",
    measurementId: "G-D7M8G0KDJ8"
};

export const app = initializeApp(FirebaseConfig);
export const auth = getAuth(app);
