import { PrismaClient } from "@prisma/client";
import { collection, getDocs, query } from "firebase/firestore/lite";
import firestore from "./../../db/firebase/firestore";

const prisma = new PrismaClient();

// const main = async () => {
//   const platforms = await fetchAllPlatForms();
//   for await (const platform of platforms) {
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

async function fetchUsers() {
  const usersCollection = collection(firestore, "users");
  const snapshot = await getDocs(query(usersCollection));
  const users = snapshot.docs
    .map((doc) => doc.data())
    .map((data) => {
      return { [data.id as string]: data };
    });
  console.log({ users });
  return users;
}

async function fetchProfiles() {
  const profilesCollection = collection(firestore, "public-profiles");
  const snapshot = await getDocs(query(profilesCollection));
  const profiles = snapshot.docs.map((doc) => doc.data());
  console.log({ profiles });
  return profiles;
}

export const importUsers = async () => {
  try {
    console.log("Start Importing Users...");
    const result = await fetchUsers();
    console.log({ result });
  } catch (error) {
    console.error(error);
  }
  console.log("Finished to import Users.");
};
