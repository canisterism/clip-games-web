export type FirestoreGame = {
  id: string;
  title: string;
  genre?: string;
  hardwareIds: string[];
  publishedAt?: string;
  price?: number;
  imageUrl?: string;
  publisher?: string;
  clipCount: number;
  ratingCount: number;
  ratingTotal: number;
  popularity: number;
  helpfulReviews: object[];
  ratingDistribution: object[];
  wikiId?: number;
};

export const keys = {
  id: "id",
  title: "title",
  genre: "genre",
  hardwareIds: "hardwareIds",
  publishedAt: "publishedAt",
  price: "price",
  imageUrl: "imageUrl",
  publisher: "publisher",
  clipCount: "clipCount",
  ratingCount: "ratingCount",
  ratingTotal: "ratingTotal",
  popularity: "popularity",
  helpfulReviews: "helpfulReviews",
  ratingDistribution: "ratingDistribution",
  wikiId: "wikiId",
} as const;
