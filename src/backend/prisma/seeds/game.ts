import { GENRES_MAP, splitGenre } from "@/src/backend/prisma/seeds/genre";
import { fetchDocumentDataList } from "@/src/backend/prisma/seeds/utils";
import { Prisma, PrismaClient } from "@prisma/client";

export const importGames = async (prisma: PrismaClient) => {
  const invalidGames = [];
  const games = await fetchDocumentDataList("games");

  for (const [id, game] of Object.entries(games)) {
    console.dir(game);

    try {
      await prisma.game.upsert({
        where: {
          id: id,
        },
        update: {},
        create: {
          id: id,
          title: game.title,
          publishedAt: game.publishedAt?.toDate(),
          price: game.price,
          imageUrl: game.imageUrl,
          publisher: {
            connectOrCreate: {
              where: { name: game.publisher },
              create: { name: game.publisher },
            },
          },
          genres: {
            create: splitGenre(game.genre as string).map((genre) => {
              return {
                genre: {
                  connectOrCreate: {
                    where: {
                      id: genre,
                    },
                    create: {
                      id: genre,
                      name: toGenreName(genre),
                    },
                  },
                },
              };
            }),
          },
          platforms: {
            create: (game.hardwareIds as string[]).map((hardwareId) => {
              return {
                platform: {
                  connect: {
                    shortenedName: hardwareId,
                  },
                },
              };
            }),
          },
          wikiId: game.wikiId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        (error.code === "P2002" || error.code === "P2025")
      ) {
        console.warn(error.message);
        console.warn(`id: ${id}, title: ${game.title}`);
        invalidGames.push({
          id: id,
          title: game.title,
          message: error.message,
        });
        continue;
      }
      throw error;
    }
  }
  console.log({ invalidGames });
};

const toGenreName = (id: string) => GENRES_MAP[id as keyof typeof GENRES_MAP];
