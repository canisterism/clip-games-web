/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: string;
  /** Represents untyped JSON */
  JSON: object;
};

export type Clip = Node & {
  __typename?: "Clip";
  createdAt: Scalars["ISO8601DateTime"];
  game: Game;
  /** ID of the object. */
  id: Scalars["ID"];
  profile: Profile;
  updatedAt: Scalars["ISO8601DateTime"];
};

export type Game = Node & {
  __typename?: "Game";
  clips: Array<Clip>;
  /** クリップ数 */
  clipsCount: Scalars["Int"];
  createdAt: Scalars["ISO8601DateTime"];
  genres: Array<Genre>;
  /** ID of the object. */
  id: Scalars["ID"];
  imageUrl?: Maybe<Scalars["String"]>;
  platforms: Array<Platform>;
  price?: Maybe<Scalars["Float"]>;
  publishedAt?: Maybe<Scalars["ISO8601DateTime"]>;
  publisher: Publisher;
  /** レビューの平均評価 */
  ratingAverage: Scalars["Float"];
  /** レビューの評価分布 */
  ratingDistribution: Scalars["JSON"];
  reviews: Array<Review>;
  /** レビュー数 */
  reviewsCount: Scalars["Int"];
  title: Scalars["String"];
  updatedAt: Scalars["ISO8601DateTime"];
};

/** The connection type for Game. */
export type GameConnection = {
  __typename?: "GameConnection";
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GameEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Game>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GameEdge = {
  __typename?: "GameEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"];
  /** The item at the end of the edge. */
  node?: Maybe<Game>;
};

export type Genre = Node & {
  __typename?: "Genre";
  games: Array<Game>;
  /** ID of the object. */
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  /** An example field added by the generator */
  testField: Scalars["String"];
};

/** An object with an ID. */
export type Node = {
  /** ID of the object. */
  id: Scalars["ID"];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: "PageInfo";
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["String"]>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["String"]>;
};

export type Platform = Node & {
  __typename?: "Platform";
  games: Array<Game>;
  /** ID of the object. */
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  publishedAt?: Maybe<Scalars["ISO8601DateTime"]>;
};

export type Profile = Node & {
  __typename?: "Profile";
  clips: Array<Clip>;
  createdAt: Scalars["ISO8601DateTime"];
  description: Scalars["String"];
  displayName: Scalars["String"];
  /** ID of the object. */
  id: Scalars["ID"];
  photoUrl: Scalars["String"];
  reviewLikes: Array<ReviewLike>;
  reviews: Array<Review>;
  updatedAt: Scalars["ISO8601DateTime"];
};

export type Publisher = Node & {
  __typename?: "Publisher";
  games: Array<Game>;
  /** ID of the object. */
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  /** Find a game by ID */
  game: Game;
  /** Fetch all games */
  games: GameConnection;
  /** Find all genres */
  genres: Array<Genre>;
  /** Find the current user */
  me?: Maybe<Profile>;
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  /** Find all platforms */
  platforms: Array<Platform>;
  /** Find a profile by ID */
  profile: Profile;
  /** Find a review by ID */
  review: Review;
  /** Fetch all reviews. filtered by game or profile */
  reviews: ReviewConnection;
};

export type QueryGameArgs = {
  id: Scalars["ID"];
};

export type QueryGamesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryNodeArgs = {
  id: Scalars["ID"];
};

export type QueryNodesArgs = {
  ids: Array<Scalars["ID"]>;
};

export type QueryProfileArgs = {
  id: Scalars["ID"];
};

export type QueryReviewArgs = {
  id: Scalars["ID"];
};

export type QueryReviewsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  gameId?: InputMaybe<Scalars["ID"]>;
  last?: InputMaybe<Scalars["Int"]>;
  profileId?: InputMaybe<Scalars["ID"]>;
};

export type Review = Node & {
  __typename?: "Review";
  body: Scalars["String"];
  createdAt: Scalars["ISO8601DateTime"];
  game: Game;
  id: Scalars["ID"];
  likeCount: Scalars["Int"];
  profile: Profile;
  rating: Scalars["Float"];
  updatedAt: Scalars["ISO8601DateTime"];
};

/** The connection type for Review. */
export type ReviewConnection = {
  __typename?: "ReviewConnection";
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ReviewEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Review>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ReviewEdge = {
  __typename?: "ReviewEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"];
  /** The item at the end of the edge. */
  node?: Maybe<Review>;
};

export type ReviewLike = Node & {
  __typename?: "ReviewLike";
  createdAt: Scalars["ISO8601DateTime"];
  /** ID of the object. */
  id: Scalars["ID"];
  liker: Profile;
  review: Review;
  updatedAt: Scalars["ISO8601DateTime"];
};

export type ReviewListItemFragmentFragment = {
  __typename?: "Review";
  id: string;
  body: string;
  rating: number;
  createdAt: string;
} & { " $fragmentName"?: "ReviewListItemFragmentFragment" };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "Profile";
    id: string;
    displayName: string;
    photoUrl: string;
  } | null;
};

export type GameQueryVariables = Exact<{
  gameId: Scalars["ID"];
}>;

export type GameQuery = {
  __typename?: "Query";
  game: {
    __typename?: "Game";
    id: string;
    title: string;
    imageUrl?: string | null;
    reviewsCount: number;
    clipsCount: number;
    publishedAt?: string | null;
    ratingAverage: number;
    reviews: Array<
      { __typename?: "Review" } & {
        " $fragmentRefs"?: {
          ReviewListItemFragmentFragment: ReviewListItemFragmentFragment;
        };
      }
    >;
  };
};

export const ReviewListItemFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReviewListItemFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Review" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "body" } },
          { kind: "Field", name: { kind: "Name", value: "rating" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReviewListItemFragmentFragment, unknown>;
export const MeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "me" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "displayName" } },
                { kind: "Field", name: { kind: "Name", value: "photoUrl" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const GameDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "game" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "gameId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "game" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "gameId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "imageUrl" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "reviewsCount" },
                },
                { kind: "Field", name: { kind: "Name", value: "clipsCount" } },
                { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "ratingAverage" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "reviews" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "ReviewListItemFragment" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReviewListItemFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Review" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "body" } },
          { kind: "Field", name: { kind: "Name", value: "rating" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GameQuery, GameQueryVariables>;
