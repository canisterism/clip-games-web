import { fetchDocumentDataList } from "@/src/backend/prisma/seeds/utils";
import { PrismaClient } from "@prisma/client";

export const importGenres = async (prisma: PrismaClient) => {
  // 日本語化するためにゲーム全部取ってマッピングを作る
  const games = await fetchDocumentDataList("games");

  for (const [_, game] of Object.entries(games)) {
    const genres = game.genre.split("/");
    for (const genre of genres) {
      await prisma.genre.upsert({
        where: {
          id: genre,
        },
        update: {},
        create: {
          id: genre,
          name: GENRES_MAP[genre as keyof typeof GENRES_MAP],
        },
      });
    }
  }
};

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
};
