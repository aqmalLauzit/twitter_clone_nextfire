// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ,
  authDomain: "twitter-clonev2.firebaseapp.com",
  projectId: "twitter-clonev2",
  storageBucket: "twitter-clonev2.appspot.com",
  messagingSenderId: "348067378008",
  appId: "1:348067378008:web:e1db4a104e61c7e6eeab2d"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) :getApp();
const db = getFirestore();
const storage = getStorage();
export {
    app, db, storage
};