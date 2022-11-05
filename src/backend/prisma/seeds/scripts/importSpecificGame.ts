import { GENRES_MAP, splitGenre } from "@/src/backend/prisma/seeds/genre";
import { PrismaClient } from "@prisma/client";
import { fetchDocumentReference } from "./../utils";

export const importSpecificGame = async (
  prisma: PrismaClient,
  ids: string[]
) => {
  for await (const id of ids) {
    const gameRef = await fetchDocumentReference("games", id);
    console.log({ gameRef });
    const game = await (await gameRef?.get())!.data()!;
    console.dir(game);

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
  }
};

const toGenreName = (id: string) => GENRES_MAP[id as keyof typeof GENRES_MAP];
