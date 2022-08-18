import { PrismaClient } from "@prisma/client";
import { collection, getDocs, query } from "firebase/firestore/lite";
import firestore from "../../firebase/db";

const prisma = new PrismaClient();

async function main() {
  const platforms = await fetchAllPlatForms();
  try {
    for await (const platform of platforms) {
      await prisma.platform.create({
        data: {
          name: platform.name,
          publishedAt: platform.publishedAt, // FIXME: jsonでsecondsが返ってきてるのでDateに直す
          documentId: platform.id,
        },
      });
      console.log({ platform });
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetchAllPlatForms() {
  const platformsCollection = collection(firestore, "hardwares");
  const snapshot = await getDocs(query(platformsCollection));
  const platforms = snapshot.docs.map((doc) => doc.data());
  console.log({ platforms });
  return platforms;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
