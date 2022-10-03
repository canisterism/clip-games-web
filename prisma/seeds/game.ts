import { fetchDocumentDataList } from "@/prisma/seeds/utils";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "info", "error", "warn"] });

export const importGames = async () => {
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
            create: (game.genre as string).split("/").map((genre) => {
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
        error.code === "P2002"
      ) {
        console.warn(error.message);
        console.warn(`id: ${id}, title: ${game.title}`);
        continue;
      }
      throw error;
    }
  }
};

const toGenreName = (id: string) => GENRES_MAP[id as keyof typeof GENRES_MAP];
const GENRES_MAP = {
  ADV: "アドベンチャー",
  ACT: "アクション",
  AADV: "アクションアドベンチャー",
  RPG: "RPG",
  ARPG: "アクションRPG",
  音楽: "音楽",
  SLG: "シミュレーション",
  RCG: "レース",
  FTG: "格闘ゲーム",
  SRPG: "シミュレーションRPG",
  SPG: "スポーツ",
  TBL: "テーブルゲーム",
  SPRG: "シミュレーションRPG(ToBeFixed)",
  SLC: "恋愛シミュレーション",
  STG: "シューティング",
  PZL: "パズル",
  TPS: "TPS",
  FPS: "FPS",
  ASTG: "アクションシューティング",
  etc: "その他",
  RACT: "レースアクション",
  クイズ: "クイズ",
};
