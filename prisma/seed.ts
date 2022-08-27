import { PrismaClient } from "@prisma/client";
import { importPlatforms } from "./seeds/platform";
import { importUsers } from "./seeds/user";

const client = new PrismaClient();

async function main() {
  await importPlatforms();
  await importUsers();
}

main()
  .catch((e) => {
    console.error(e);
    client.$disconnect();
  })
  .finally(() => {
    client.$disconnect();
  });
