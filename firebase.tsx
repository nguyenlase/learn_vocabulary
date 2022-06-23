// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDueYe2mMO-fMlydJnt-WDJipn7ntc_JbQ",
  authDomain: "learn-vocabulary-7f3db.firebaseapp.com",
  projectId: "learn-vocabulary-7f3db",
  storageBucket: "learn-vocabulary-7f3db.appspot.com",
  messagingSenderId: "120816393479",
  appId: "1:120816393479:web:29f47be981101ea43b39a2",
  measurementId: "G-0V3Z84GWF3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();