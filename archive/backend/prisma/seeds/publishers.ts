import { fetchDocumentDataList } from "@/archive/backend/prisma/seeds/utils";
import { PrismaClient } from "@prisma/client";

export const importPublishers = async (prisma: PrismaClient) => {
  const games = await fetchDocumentDataList("games");

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
