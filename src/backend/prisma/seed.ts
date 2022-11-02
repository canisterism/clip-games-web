import { importClips } from "@/src/backend/prisma/seeds/clip";
import { importGames } from "@/src/backend/prisma/seeds/game";
import { importGenres } from "@/src/backend/prisma/seeds/genre";
import { importPlatforms } from "@/src/backend/prisma/seeds/platform";
import { importPublishers } from "@/src/backend/prisma/seeds/publishers";
import { importReviews } from "@/src/backend/prisma/seeds/review";
import { importUsers } from "@/src/backend/prisma/seeds/user";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  await importPlatforms(prisma);
  await importGenres(prisma);
  await importPublishers(prisma);
  await importUsers(prisma);
  await importGames(prisma);
  await importClips(prisma);
  await importReviews(prisma);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
