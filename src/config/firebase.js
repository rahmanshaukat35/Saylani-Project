// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVatisYxlZUuc6jCX7yF0WO58X0mEAl1M",
  authDomain: "event-mangment-15f5d.firebaseapp.com",
  projectId: "event-mangment-15f5d",
  storageBucket: "event-mangment-15f5d.appspot.com",
  messagingSenderId: "640440183749",
  appId: "1:640440183749:web:1117dd816cc7e7dd25f9ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { analytics, auth, firestore, storage };
