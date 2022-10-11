import { findManyCursor } from "@/graphql/helpers/prisma/findManyCursor";
import { Game } from "@/graphql/resources/Game";
import { GameConnection } from "@/graphql/resources/GameConnection";
import { PrismaClient } from "@prisma/client";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { ConnectionArgs } from "./../resources/Connection/types";

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

  @Query((returns) => GameConnection, { nullable: true })
  async gamesConnection(
    @Arg("args") connectionArgs: ConnectionArgs,
    @Ctx("prisma") prisma: PrismaClient
  ) {
    findManyCursor(args => prisma.game.findMany({...args}))

    }
  }
}
