import { Game } from "@/graphql/backend/resources/Game";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Review {
  game!: Game;

  @Field({ nullable: true })
  content?: string;

  @Field((type) => Int, { nullable: true })
  rating?: number;

  @Field()
  createdAt!: Date;
}