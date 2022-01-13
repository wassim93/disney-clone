import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// change your config file with your project settings in firebase
const firebaseConfig = {
  apiKey: "******************************",
  authDomain: "**********************",
  projectId: "*********************",
  storageBucket: "******************",
  messagingSenderId: "**************",
  appId: "************************",
  measurementId: "**********************",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { db, auth, provider, storage };
