import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import { getFirestore } from "firebase/firestore/lite";
initializeApp(firebaseConfig);
const db = getFirestore();

export default db;
