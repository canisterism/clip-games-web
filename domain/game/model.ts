export type Game = {
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
