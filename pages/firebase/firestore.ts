import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import config from "./config";

initializeApp(config);
const firestore = getFirestore();

export default firestore;
