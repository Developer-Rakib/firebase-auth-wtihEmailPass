// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0APkuCYvYpF6jn7vLuTyhhpYFEGAKjD8",
    authDomain: "fir-auth-withemail.firebaseapp.com",
    projectId: "fir-auth-withemail",
    storageBucket: "fir-auth-withemail.appspot.com",
    messagingSenderId: "1085435843152",
    appId: "1:1085435843152:web:911cf48727a6676c50f755"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;