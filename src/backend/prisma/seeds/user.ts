import { auth } from "@/src/backend/prisma/firebaseAdmin";
import { PrismaClient } from "@prisma/client";
import { fetchDocumentDataList } from "./utils";

export const importUsers = async (prisma: PrismaClient) => {
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
      update: {},
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
  console.log("Finished to import Users.");
};
