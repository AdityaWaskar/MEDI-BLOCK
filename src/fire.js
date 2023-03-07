// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import firebase from "firebase";
import firebase from "firebase/compat/app";
//
// import { getAuth } from "firebase/auth";
import "firebase/auth";

// const auth = getAuth();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "hms-using-blockchain.firebaseapp.com",
  projectId: "hms-using-blockchain",
  storageBucket: "hms-using-blockchain.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_API_ID,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyAZwt3kYzTlI5hZ8oaBfCsxmZFFGZzXEMA",
//   authDomain: "hms-using-blockchain.firebaseapp.com",
//   projectId: "hms-using-blockchain",
//   storageBucket: "hms-using-blockchain.appspot.com",
//   messagingSenderId: "253742420387",
//   appId: "1:253742420387:web:192a8a4018faadffd88a16"
// };

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
