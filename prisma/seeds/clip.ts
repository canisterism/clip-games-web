import { PrismaClient } from "@prisma/client";
import { fetchSubCollection } from "./utils";

const prisma = new PrismaClient({ log: ["query", "info", "error", "warn"] });

export const importClips = async () => {
  const clips = await fetchSubCollection("clips");
  for (const clip of clips) {
    await prisma.clip.upsert({
      where: {
        gameId_userId: {
          gameId: clip.game.ref.id,
          userId: clip.profile.ref.id,
        },
      },
      create: {
        gameId: clip.game.ref.id,
        userId: clip.profile.ref.id,
        createdAt: clip.createdAt.toDate(),
      },
      update: {},
    });
  }
};
