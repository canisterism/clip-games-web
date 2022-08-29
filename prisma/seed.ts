import { importGames } from "@/prisma/seeds/game";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  // await importPlatforms();
  // await importUsers();
  importGames();
}

main()
  .catch((e) => {
    console.error(e);
    client.$disconnect();
  })
  .finally(() => {
    client.$disconnect();
  });
