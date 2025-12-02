// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";

import { getFirestore, collection } from "firebase/firestore";
// Your web app's Firebase configuration
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAxiaZq4zAkw0ma9BD4ySN2zPywsI_yYH0",
  authDomain: "finance-app-36388.firebaseapp.com",
  projectId: "finance-app-36388",
  storageBucket: "finance-app-36388.firebasestorage.app",
  messagingSenderId: "775713210817",
  appId: "1:775713210817:web:df0efc40ddf87bebdf2f40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)
// });
export const auth = getAuth(app);

export const db = getFirestore(app);

export const userRef = collection(db, "users");