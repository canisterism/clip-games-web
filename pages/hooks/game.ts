import { useEffect, useState } from "react";
import { Game } from "../../domain/game/model";
import * as gateways from "../../gateway";

export const useGames = (): Game[] => {
  const [games, setGames] = useState<Game[]>([]);

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
