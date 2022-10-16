import { Review } from "@/graphql/resources/Review";
import { Resolver } from "type-graphql";

@Resolver((of) => Review)
export class ReviewResolver {}
