import { PrismaClient } from "@prisma/client";
import { fetchSubCollection } from "./utils";

export const importReviews = async (prisma: PrismaClient) => {
  const reviews = await fetchSubCollection("reviews");
  for (const review of reviews) {
    console.dir(review);
    await prisma.review.upsert({
      where: {
        gameId_profileId: {
          gameId: review.game.ref.id,
          profileId: review.profile.ref.id,
        },
      },
      create: {
        gameId: review.game.ref.id,
        profileId: review.profile.ref.id,
        content: review.body,
        rating: review.rating,
        createdAt: review.createdAt.toDate(),
        updatedAt: review.updatedAt.toDate(),
      },
      update: {},
    });
  }
};
