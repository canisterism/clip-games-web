import { fetchDocumentDataList } from "@/prisma/seeds/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "info", "error", "warn"] });

export const importPublishers = async () => {
  const games = await fetchDocumentDataList("games", 10);

  for (const [_, game] of Object.entries(games)) {
    if (!game.publisher) {
      continue;
    }

    await prisma.publisher.upsert({
      where: {
        name: game.publisher,
      },
      update: {},
      create: {
        name: game.publisher,
      },
    });
  }
};
