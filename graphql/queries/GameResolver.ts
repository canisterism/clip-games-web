import { Game } from "@/graphql/resources/Game";
import { PrismaClient } from "@prisma/client";
import { Arg, Ctx, Query, Resolver } from "type-graphql";

@Resolver((of) => Game)
export class GameResolver {
  @Query((returns) => Game, { nullable: true })
  async game(
    @Arg("gameId") gameId: string,
    @Ctx("prisma") prisma: PrismaClient
  ) {
    const game = await prisma.game.findFirst({
      select: {
        id: true,
        title: true,
        publishedAt: true,
        price: true,
        imageUrl: true,
        wikiId: true,
        publisherId: true,
      },
      where: {
        id: gameId,
      },
    });
    return game;
  }
}
