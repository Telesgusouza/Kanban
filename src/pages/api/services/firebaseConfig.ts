import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDP1L6L0PSFA4KWkjE-Y_09zfEINEKYDbs",
  authDomain: "kanban-b71b4.firebaseapp.com",
  projectId: "kanban-b71b4",
  storageBucket: "kanban-b71b4.appspot.com",
  messagingSenderId: "456804306049",
  appId: "1:456804306049:web:6df5f8f4e26c2628ee5180"
};

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);
export const storage = getStorage(firebase);
