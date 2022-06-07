// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJM2DLu4kgTC8nXVnDEWeKVZNue8TJ4iI",
  authDomain: "library-4d028.firebaseapp.com",
  projectId: "library-4d028",
  storageBucket: "library-4d028.appspot.com",
  messagingSenderId: "54252800298",
  appId: "1:54252800298:web:82d5a769e8f70eb19eb653"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };