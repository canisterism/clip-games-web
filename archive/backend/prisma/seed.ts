import { importClips } from "@/archive/backend/prisma/seeds/clip";
import { importGames } from "@/archive/backend/prisma/seeds/game";
import { importReviews } from "@/archive/backend/prisma/seeds/review";
import { importReviewLikes } from "@/archive/backend/prisma/seeds/reviewLike";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  // await importPlatforms(prisma);
  // await importGenres(prisma);
  // await importPublishers(prisma);
  // await importProfiles(prisma);
  await importGames(prisma);
  await importClips(prisma);
  await importReviews(prisma);
  await importReviewLikes(prisma);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
