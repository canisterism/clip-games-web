import { importClips } from "@/prisma/seeds/clip";
import { importGames } from "@/prisma/seeds/game";
import { importPlatforms } from "@/prisma/seeds/platform";
import { importReviews } from "@/prisma/seeds/review";
import { importUsers } from "@/prisma/seeds/user";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  await importPlatforms(prisma);
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
