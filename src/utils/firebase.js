// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwkQ3ckHdBdYaPCch97TpdzM5JJRn5xMM",
  authDomain: "adopcion-fa25c.firebaseapp.com",
  projectId: "adopcion-fa25c",
  storageBucket: "adopcion-fa25c.appspot.com",
  messagingSenderId: "1025021771637",
  appId: "1:1025021771637:web:4e9bcd7317e81fcfe99d3c"
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);