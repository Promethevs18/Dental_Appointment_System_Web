// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-JvFxh7D4712W8rXeCtBFzWAniBd9LOQ",
  authDomain: "dental-management-system-2dccb.firebaseapp.com",
  databaseURL: "https://dental-management-system-2dccb-default-rtdb.firebaseio.com",
  projectId: "dental-management-system-2dccb",
  storageBucket: "dental-management-system-2dccb.appspot.com",
  messagingSenderId: "760919837823",
  appId: "1:760919837823:web:dcf0a3515496a783cf434a",
  measurementId: "G-KP49Q7TK8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };

//THIS PROJECT WAS MADE BY PROMETHEUS
