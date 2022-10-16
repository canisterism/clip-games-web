import { Review } from "@/graphql/backend/resources/Review";
import { Resolver } from "type-graphql";

@Resolver((of) => Review)
export class ReviewResolver {}
