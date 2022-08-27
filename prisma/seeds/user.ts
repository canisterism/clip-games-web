import { auth } from "@/prisma/firebaseAdmin";
import { PrismaClient } from "@prisma/client";
import { fetchDocumentDataList } from "./utils";

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

export const importUsers = async () => {
  try {
    const usersDocuments = await fetchDocumentDataList("users");
    const publicProfilesDocuments = await fetchDocumentDataList(
      "public-profiles"
    );

    for await (const authUser of (await auth.listUsers()).users) {
      const user = usersDocuments[authUser.uid];
      const publicProfile = publicProfilesDocuments[authUser.uid];

      const record = await prisma.user.upsert({
        where: {
          id: authUser.uid,
        },
        update: {
          id: authUser.uid,
          displayName: publicProfile.displayName,
          description: publicProfile.description,
          photoUrl: publicProfile.photoUrl,
          notificationReadAt: user.notificationReadAt.toDate(),
          createdAt: publicProfile.createdAt.toDate(),
          updatedAt: publicProfile.updatedAt.toDate(),
        },
        create: {
          id: authUser.uid,
          displayName: publicProfile.displayName,
          description: publicProfile.description,
          photoUrl: publicProfile.photoUrl,
          notificationReadAt: user.notificationReadAt.toDate(),
          createdAt: publicProfile.createdAt.toDate(),
          updatedAt: publicProfile.updatedAt.toDate(),
        },
      });
      console.dir({ record });
    }
  } catch (error) {
    console.error(error);
  }
  console.log("Finished to import Users.");
};

// id?: boolean
// displayName?: boolean
// description?: boolean
// photoUrl?: boolean
// notificationReadAt?: boolean
// createdAt?: boolean
// updatedAt?: boolean
