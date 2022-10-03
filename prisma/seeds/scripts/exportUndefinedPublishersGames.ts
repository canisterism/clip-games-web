import { fetchDocumentDataList } from "@/prisma/seeds/utils";
import { writeFileSync } from "fs";

export const exportUndefinedPublishersGames = async () => {
  const games = await fetchDocumentDataList("games");
  const filteredGames = <any>{};
  for (const [id, game] of Object.entries(games)) {
    if (game.publisher === null) {
      filteredGames[id] = { title: game.title, publisher: null };
    }
  }

  writeFileSync("games.json", JSON.stringify(filteredGames, null, "    "));
};
