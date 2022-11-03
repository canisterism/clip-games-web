import { fetchDocumentDataList } from "@/src/backend/prisma/seeds/utils";
import { PrismaClient } from "@prisma/client";

export const importGenres = async (prisma: PrismaClient) => {
  // 日本語化するためにゲーム全部取ってマッピングを作る
  const games = await fetchDocumentDataList("games");

  for (const [_, game] of Object.entries(games)) {
    if (!game.genre) {
      continue;
    }
    const genres = splitGenre(game.genre as string);
    for (let genre of genres) {
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

export const splitGenre = (rawString: string): string[] => {
  if (rawString == null) {
    return [];
  }
  return rawString
    .split(/(?:\+)|(?:\&)|(?:\/)/) // ? & / は区切り文字なのでsplitする
    .flat()
    .map((str) => str.replace(/(\.)|(他)|(3D)|\s/, "")) // . 他 3D 空白などは扶養なので削除
    .filter((v) => v?.length > 0)
    .map((str) =>
      Object.keys(INVALId_GENRE_MAP).includes(str)
        ? INVALId_GENRE_MAP[str as keyof typeof INVALId_GENRE_MAP]
        : str
    )
    .filter((v) => v) as string[];
};

// マスタ側のデータが間違ってるなどの理由で修正されるべきジャンルのキー名と正しいキー名のマッピング
export const INVALId_GENRE_MAP = {
  SPRG: "SRPG",
  PZLl: "PZL",
  SPT: "SPG",
  ボードゲーム: "BG",
  AVG: "ADV",
  ATC: "ACT",
  ETC: "etc",
  RST: undefined,
  ACR: undefined,
  act: "ACT",
  RCE: "RCG",
  SRG: "SLG",
  SLC: "SLG",
  BDG: "BG",
};

export const GENRES_MAP = {
  ACT: "アクション",
  PZL: "パズル",
  TBL: "テーブルゲーム",
  RPG: "RPG",
  クイズ: "クイズ",
  ARPG: "アクションRPG",
  ADV: "アドベンチャー",
  AADV: "アクションアドベンチャー",
  STG: "シューティング",
  RCG: "レース",
  SLG: "シミュレーション",
  etc: "その他",
  SRPG: "シミュレーションRPG",
  SPG: "スポーツ",
  FTG: "格闘ゲーム",
  APZL: "アクションパズル",
  音楽: "音楽",
  RTS: "リアルタイムストラテジー",
  FPS: "FPS",
  TPS: "TPS",
  BG: "ボードゲーム",
  ダンスシミュレーション: "ダンスシミュレーション",
  FACT: "格闘アクション",
  キャラ: "キャラゲー",
  ASTG: "アクションシューティング",
  脱衣麻雀: "脱衣麻雀",
  RPG制作: "RPG制作",
  RACT: "レースアクション",
  FPA: "ファーストパーソンアドベンチャー",
  TCG: "トレーディングカードゲーム",
  サバイバル: "サバイバル",
};
