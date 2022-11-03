import { fetchSubCollection } from "@/src/backend/prisma/seeds/utils";
import { PrismaClient } from "@prisma/client";

export const importReviewLikes = async (prisma: PrismaClient) => {
  const likes = await fetchSubCollection("likes");
  for await (const [_, like] of Object.entries(likes)) {
    if (!like.author || !like.viewer || !like.game) {
      continue;
    }
    const review = await prisma.review.findFirstOrThrow({
      where: {
        gameId: like.game.ref.id,
        profileId: like.author.ref.id,
      },
    });

    await prisma.reviewLike.upsert({
      where: {
        reviewId_profileId: {
          reviewId: review.id,
          profileId: like.viewer.ref.id,
        },
      },
      create: {
        review: {
          connect: {
            id: review.id,
          },
        },
        profile: {
          connect: {
            id: like.viewer.ref.id,
          },
        },
        createdAt: like.createdAt.toDate(),
      },
      update: {},
    });
  }
};
