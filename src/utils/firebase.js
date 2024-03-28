// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAf8mUK0tchgwuqDf2YNa99dsxdXMnPPeg",
  authDomain: "netflixgpt-1169a.firebaseapp.com",
  projectId: "netflixgpt-1169a",
  storageBucket: "netflixgpt-1169a.appspot.com",
  messagingSenderId: "43991892087",
  appId: "1:43991892087:web:b05dfb753471c2d0fa0672",
  measurementId: "G-2MN8KFHGYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();