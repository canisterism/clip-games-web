import { PrismaClient } from "@prisma/client";
import { fetchDocumentDataList } from "./utils";

export const importPlatforms = async (prisma: PrismaClient) => {
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
    console.dir(record);
  }
  console.log("Finished to import Platforms.");
};
