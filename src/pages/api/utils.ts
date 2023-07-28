import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebaseConfig";

export async function userOn() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.replace("/");
    }
  });
}

export async function getUserOn() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.replace("/dashboard");
    }
  });
}
