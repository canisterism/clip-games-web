import { auth } from "@/archive/backend/prisma/firebaseAdmin";
import { PrismaClient } from "@prisma/client";
import { fetchDocumentDataList } from "./utils";

export const importProfiles = async (prisma: PrismaClient) => {
  const usersDocuments = await fetchDocumentDataList("users");
  const publicProfilesDocuments = await fetchDocumentDataList(
    "public-profiles"
  );

  for await (const authProfile of (await auth.listUsers()).users) {
    const user = usersDocuments[authProfile.uid];
    const publicProfile = publicProfilesDocuments[authProfile.uid];

    const profileRecord = await prisma.profile.upsert({
      where: {
        id: authProfile.uid,
      },
      update: {},
      create: {
        id: authProfile.uid,
        displayName: publicProfile.displayName,
        description: publicProfile.description,
        photoUrl: publicProfile.photoUrl,
        createdAt: publicProfile.createdAt.toDate(),
        updatedAt: publicProfile.updatedAt.toDate(),
      },
    });
    console.dir({ profileRecord });

    const userRecord = await prisma.user.upsert({
      where: {
        id: authProfile.uid,
      },
      update: {},
      create: {
        id: authProfile.uid,
        notificationReadAt: user.notificationReadAt.toDate(),
        createdAt: user.createdAt.toDate(),
        updatedAt: user.updatedAt.toDate(),
      },
    });
    console.dir({ userRecord });
  }
  console.log("Finished to import Profiles.");
};
