import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore/lite";
import { Game } from "../../domain/game/model";
import { keys } from "./model";

export const converter: FirestoreDataConverter<Game> = {
  toFirestore: (_: Game) => {
    return {};
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Game {
    const data = snapshot.data()!;
    return {
      id: snapshot.id,
      title: data[keys.title],
      genre: data[keys.genre],
      hardwareIds: data[keys.hardwareIds],
      publishedAt: data[keys.publishedAt],
      price: data[keys.price],
      imageUrl: data[keys.imageUrl],
      publisher: data[keys.publisher],
      clipCount: data[keys.clipCount],
      ratingCount: data[keys.ratingCount],
      ratingTotal: data[keys.ratingTotal],
      popularity: data[keys.popularity],
      helpfulReviews: data[keys.helpfulReviews],
      ratingDistribution: data[keys.ratingDistribution],
      wikiId: data[keys.wikiId],
    };
  },
};
