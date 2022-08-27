import { PrismaClient } from "@prisma/client";
import { fetchDocumentData } from "./utils";

const prisma = new PrismaClient();

// const main = async () => {
//     for (const [_, user] of Object.entries(result)) {
//      console.log({ user });
//     }
//     console.log(`Import ${platform.name}`);
//     const record = await prisma.platform.create({
//       data: {
//         name: platform.name,
//         shortenedName: platform.id,
//         publishedAt: new Date(platform.publishedAt.toDate().toDateString()),
//       },
//     });
//     console.log(`Imported ${JSON.parse(JSON.stringify(record))}...`);
//   }
// };

export const importUsers = async () => {
  try {
    const result = await fetchDocumentData("users");
    console.log({ result });
  } catch (error) {
    console.error(error);
  }
  console.log("Finished to import Users.");
};
