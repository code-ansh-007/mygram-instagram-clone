// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeayq4Y46S-ki82wAwiFRv1QEPL0GQ3iI",
  authDomain: "mygram-4032a.firebaseapp.com",
  projectId: "mygram-4032a",
  storageBucket: "mygram-4032a.appspot.com",
  messagingSenderId: "67994430960",
  appId: "1:67994430960:web:b085d46b85d66109054135",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp(); // this line of code says that if the app has already been initialized then dont initialize another instance of firebase and if it is not initialized then just initialize the app
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
