import {
  collection,
  Firestore,
  getDocs,
  limit,
  query,
} from "firebase/firestore/lite";
import db from "../../db/firebase/firestore";
import { Game } from "../../domain/game/model";
import { converter } from "./converter";

export const getGames = (db: Firestore) => async (): Promise<Game[]> => {
  const gameCollection = collection(db, "games");
  const snapshot = await getDocs(
    query(gameCollection, limit(10)).withConverter<Game>(converter)
  );
  const games = snapshot.docs.map((doc) => doc.data());
  return games;
};

export const get = getGames(db);
