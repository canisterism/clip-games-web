import { PrismaClient } from "@prisma/client";
import firestore from "db/firebase/firestore";
import { collection, getDocs, query } from "firebase/firestore/lite";

const prisma = new PrismaClient();

export const importPlatforms = async () => {
  const platforms = await fetchAllPlatforms();
  for await (const platform of platforms) {
    console.log(`Import ${platform.name}`);
    const record = await prisma.platform.create({
      data: {
        name: platform.name,
        shortenedName: platform.id,
        publishedAt: new Date(platform.publishedAt.toDate().toDateString()),
      },
    });
    console.log(`Imported ${JSON.parse(JSON.stringify(record))}...`);
  }
};

async function fetchAllPlatforms() {
  const platformsCollection = collection(firestore, "hardwares");
  const snapshot = await getDocs(query(platformsCollection));
  const platforms = snapshot.docs.map((doc) => doc.data());
  console.log({ platforms });
  return platforms;
}
