// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV17f6CWFjKygn7D56auNxId2AAjNOtYo",
  authDomain: "maulund-kundeklub.firebaseapp.com",
  projectId: "maulund-kundeklub",
  storageBucket: "maulund-kundeklub.appspot.com",
  messagingSenderId: "918874351877",
  appId: "1:918874351877:web:2394e95f5912d9d3492f6c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
export const storageRef = ref(storage);
