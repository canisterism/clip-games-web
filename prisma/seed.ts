import { importGenres } from "@/prisma/seeds/genre";
import { importPlatforms } from "@/prisma/seeds/platform";
import { importPublishers } from "@/prisma/seeds/publishers";
import { importUsers } from "@/prisma/seeds/user";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  await importPlatforms();
  await importUsers();
  await importGenres();
  await importPublishers();
}

main()
  .catch((e) => {
    console.error(e);
    client.$disconnect();
  })
  .finally(() => {
    client.$disconnect();
  });
