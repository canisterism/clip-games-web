import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Game {
  @Field((type) => ID)
  id!: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  publishedAt?: Date;

  @Field((type) => Int, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  imageUrl?: string;
}
