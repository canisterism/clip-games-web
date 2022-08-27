import { PrismaClient } from "@prisma/client";
import { fetchDocumentData } from "./utils";

const prisma = new PrismaClient();

export const importPlatforms = async () => {
  const platforms = await fetchDocumentData("hardwares");
  for await (const [_, platform] of Object.entries(platforms)) {
    // TODO: upsertにする
    // const record = await prisma.platform.create({
    //   data: {
    //     name: platform.name,
    //     shortenedName: platform.id,
    //     publishedAt: new Date(platform.publishedAt.toDate().toDateString()),
    //   },
    // });
    // console.log(`Imported ${JSON.parse(JSON.stringify(record))}...`);
  }
};
