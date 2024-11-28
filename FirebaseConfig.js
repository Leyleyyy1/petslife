import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const FirebaseConfig = {
    apiKey: "AIzaSyBgVkv9TyIGhNpDEPrzH3x0lcbHuVE2Yuw",
    authDomain: "petslife-131e3.firebaseapp.com",
    projectId: "petslife-131e3",
    storageBucket: "petslife-131e3.firebasestorage.app",
    messagingSenderId: "921954519435",
    appId: "1:921954519435:web:4ed5115ce39e8864a6878e",
    measurementId: "G-D7M8G0KDJ8"
};

const app = initializeApp(FirebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const produkCollection = collection(db, 'produk');

export { app, auth, db, produkCollection };