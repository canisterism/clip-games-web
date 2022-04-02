import {
  collection,
  Firestore,
  getDocs,
  limit,
  query,
} from "firebase/firestore/lite";
import db from "../../firebase/db";

const getGames = (db: Firestore) => async () => {
  const gameCollection = collection(db, "games");
  const snapshot = await getDocs(query(gameCollection, limit(10)));
  const games = snapshot.docs.map((doc) => doc.data());
  return games;
};

export const get = getGames(db);
