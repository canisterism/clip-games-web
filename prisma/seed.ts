import { importClips } from "@/prisma/seeds/clip";
import { importGames } from "@/prisma/seeds/game";
import { importPlatforms } from "@/prisma/seeds/platform";
import { importReviews } from "@/prisma/seeds/review";
import { importUsers } from "@/prisma/seeds/user";

async function main() {
  await importPlatforms();
  await importUsers();
  await importGames();
  await importClips();
  await importReviews();
}

main().catch((e) => {
  console.error(e);
});
