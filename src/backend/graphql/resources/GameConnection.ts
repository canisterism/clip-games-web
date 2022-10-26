import {
  ConnectionType,
  EdgeType,
} from "@/src/backend/graphql/resources/Connection/types";
import { Game } from "@/src/backend/graphql/resources/Game";
import { ObjectType } from "type-graphql";

@ObjectType()
export class GameEdge extends EdgeType("game", Game) {}

@ObjectType()
export class GameConnection extends ConnectionType<GameEdge>(
  "game",
  GameEdge
) {}
