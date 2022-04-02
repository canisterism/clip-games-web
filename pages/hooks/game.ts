import { DocumentData } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import * as gateways from "../../gateways";

export const useGames = (): DocumentData[] => {
  const [games, setGames] = useState<DocumentData[]>([]);

  useEffect(() => {
    (async () => {
      console.log("fetching games...");

      const games = await gateways.game.get();
      console.log(games.length, "games fetched.");

      setGames(games);
    })();
  }, []);

  return games;
};
