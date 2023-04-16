import { fetchSubCollection } from "@/archive/backend/prisma/seeds/utils";
import { Prisma, PrismaClient } from "@prisma/client";

export const importReviewLikes = async (prisma: PrismaClient) => {
  const likes = await fetchSubCollection("likes");
  for await (const [_, like] of Object.entries(likes)) {
    if (!like.author || !like.viewer || !like.game) {
      continue;
    }
    try {
      const review = await prisma.review.findFirst({
        where: {
          gameId: like.game.ref.id,
          profileId: like.author.ref.id,
        },
      });
      if (!review) {
        continue;
      }

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
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025" // 対象のレビューかプロフィールが存在しないケース
      ) {
        console.error("Failed to import this like: ");
        console.error({ like });
        continue;
      }
      throw error;
    }
  }
};
