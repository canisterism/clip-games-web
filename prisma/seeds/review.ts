import { PrismaClient } from "@prisma/client";
import { fetchSubCollection } from "./utils";

const prisma = new PrismaClient({ log: ["query", "info", "error", "warn"] });

export const importReviews = async () => {
  const reviews = await fetchSubCollection("reviews");
  for (const review of reviews) {
    console.dir(review);
    await prisma.review.upsert({
      where: {
        gameId_userId: {
          gameId: review.game.ref.id,
          userId: review.profile.ref.id,
        },
      },
      create: {
        gameId: review.game.ref.id,
        userId: review.profile.ref.id,
        content: review.body,
        rating: review.rating,
        createdAt: review.createdAt.toDate(),
        updatedAt: review.updatedAt.toDate(),
      },
      update: {},
    });
  }
};
