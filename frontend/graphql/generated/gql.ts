/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  mutation postReview($input: PostReviewInput!) {\n    postReview(input: $input) {\n      review {\n        id\n        body\n        rating\n        createdAt\n        profile {\n          id\n          displayName\n          photoUrl\n        }\n      }\n    }\n  }\n":
    types.PostReviewDocument,
  "\n  fragment ReviewListItemFragment on Review {\n    id\n    body\n    rating\n    createdAt\n    profile {\n      id\n      displayName\n      photoUrl\n    }\n  }\n":
    types.ReviewListItemFragmentFragmentDoc,
  "\n  query me {\n    me {\n      id\n      displayName\n      photoUrl\n    }\n  }\n":
    types.MeDocument,
  "\n  query game($gameId: ID!) {\n    game(id: $gameId) {\n      id\n      title\n      imageUrl\n      reviewsCount\n      clipsCount\n      publishedAt\n      ratingAverage\n      price\n      genres {\n        id\n        name\n      }\n      publisher {\n        id\n        name\n      }\n      platforms {\n        id\n        name\n      }\n      reviews {\n        ...ReviewListItemFragment\n      }\n    }\n  }\n":
    types.GameDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation postReview($input: PostReviewInput!) {\n    postReview(input: $input) {\n      review {\n        id\n        body\n        rating\n        createdAt\n        profile {\n          id\n          displayName\n          photoUrl\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation postReview($input: PostReviewInput!) {\n    postReview(input: $input) {\n      review {\n        id\n        body\n        rating\n        createdAt\n        profile {\n          id\n          displayName\n          photoUrl\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ReviewListItemFragment on Review {\n    id\n    body\n    rating\n    createdAt\n    profile {\n      id\n      displayName\n      photoUrl\n    }\n  }\n"
): (typeof documents)["\n  fragment ReviewListItemFragment on Review {\n    id\n    body\n    rating\n    createdAt\n    profile {\n      id\n      displayName\n      photoUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query me {\n    me {\n      id\n      displayName\n      photoUrl\n    }\n  }\n"
): (typeof documents)["\n  query me {\n    me {\n      id\n      displayName\n      photoUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query game($gameId: ID!) {\n    game(id: $gameId) {\n      id\n      title\n      imageUrl\n      reviewsCount\n      clipsCount\n      publishedAt\n      ratingAverage\n      price\n      genres {\n        id\n        name\n      }\n      publisher {\n        id\n        name\n      }\n      platforms {\n        id\n        name\n      }\n      reviews {\n        ...ReviewListItemFragment\n      }\n    }\n  }\n"
): (typeof documents)["\n  query game($gameId: ID!) {\n    game(id: $gameId) {\n      id\n      title\n      imageUrl\n      reviewsCount\n      clipsCount\n      publishedAt\n      ratingAverage\n      price\n      genres {\n        id\n        name\n      }\n      publisher {\n        id\n        name\n      }\n      platforms {\n        id\n        name\n      }\n      reviews {\n        ...ReviewListItemFragment\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
