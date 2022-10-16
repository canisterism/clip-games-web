import { Game } from "@/graphql/backend/resources/Game";
import { Review } from "@/graphql/backend/resources/Review";
import { PrismaClient } from "@prisma/client";
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";

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

  @FieldResolver((of) => [Review])
  async reviews(@Root() game: Game, @Ctx("prisma") prisma: PrismaClient) {
    const reviews = await prisma.review.findMany({
      select: {
        game: true,
        content: true,
        rating: true,
        createdAt: true,
      },
      where: {
        gameId: game.id,
      },
    });
    return reviews ?? [];
  }
}
