import config from "db/firebase/config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

initializeApp(config);
const firestore = getFirestore();

export default firestore;
