import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/*const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
}; */

const firebaseConfig = {
  apiKey: "AIzaSyBx73qitQlo6AX24IgZsvYVnbaRYkQJ7eE",
  authDomain: "kanban-27abd.firebaseapp.com",
  projectId: "kanban-27abd",
  storageBucket: "kanban-27abd.appspot.com",
  messagingSenderId: "717279630814",
  appId: "1:717279630814:web:4f392b2cf770221084f94f",
};

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);
export const storage = getStorage(firebase);
