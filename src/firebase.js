import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGTvzUsSWuj1UQaOoiPhBZBDIpykNmF0s",
  authDomain: "rejo-community.firebaseapp.com",
  projectId: "rejo-community",
  storageBucket: "rejo-community.appspot.com", // sax
  messagingSenderId: "696670843189",
  appId: "1:696670843189:web:aea99fda4a6c1fce1fdc7c",
  measurementId: "G-63KSNK7E9X"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);