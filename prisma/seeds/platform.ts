import { PrismaClient } from "@prisma/client";
import { fetchDocumentDataList } from "./utils";

const prisma = new PrismaClient();

export const importPlatforms = async () => {
  const platforms = await fetchDocumentDataList("hardwares");
  for await (const [_, platform] of Object.entries(platforms)) {
    const record = await prisma.platform.upsert({
      where: {
        name: platform.name,
      },
      update: {},
      create: {
        name: platform.name,
        shortenedName: platform.id,
        publishedAt: platform.publishedAt.toDate(),
      },
    });
    console.log(`Imported ${JSON.parse(JSON.stringify(record))}.`);
  }
};
