import { Prisma, PrismaClient } from "@prisma/client";
import { fetchSubCollection } from "./utils";

export const importClips = async (prisma: PrismaClient) => {
  const clips = await fetchSubCollection("clips");
  for (const clip of clips) {
    console.log(`clip.game.ref.id: ${clip.game.ref.id}`);
    console.log(`clip.profile.ref.id: ${clip.profile.ref.id}`);
    try {
      await prisma.clip.upsert({
        where: {
          gameId_profileId: {
            gameId: clip.game.ref.id,
            profileId: clip.profile.ref.id,
          },
        },
        create: {
          gameId: clip.game.ref.id,
          profileId: clip.profile.ref.id,
          createdAt: clip.createdAt.toDate(),
        },
        update: {},
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2003" // 対象のゲームかユーザーが存在しないケース
      ) {
        console.error("Failed to import this clip: ");
        console.error({ clip });
        continue;
      }
      throw error;
    }
  }
};
