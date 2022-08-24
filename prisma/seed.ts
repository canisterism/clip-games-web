import { PrismaClient } from "@prisma/client";
import { importPlatforms } from "./seeds/platform";

const client = new PrismaClient();

async function main() {
  await importPlatforms();
}

main()
  .catch((e) => {
    console.error(e);
    client.$disconnect();
  })
  .finally(() => {
    client.$disconnect();
  });
