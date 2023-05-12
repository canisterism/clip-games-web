/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  __typename?: 'Clip';
  createdAt: Scalars['ISO8601DateTime'];
  game: Game;
  id: Scalars['ID'];
  profile: Profile;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type Game = Node & {
  __typename?: 'Game';
  clips: Array<Clip>;
  clipsCount: Scalars['Int'];
  createdAt: Scalars['ISO8601DateTime'];
  genres: Array<Genre>;
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  platforms: Array<Platform>;
  price?: Maybe<Scalars['Float']>;
  publishedAt?: Maybe<Scalars['ISO8601DateTime']>;
  publisher: Publisher;
  ratingAverage: Scalars['Float'];
  ratingDistribution: Scalars['JSON'];
  reviews: Array<Review>;
  reviewsCount: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};

export type Genre = Node & {
  __typename?: 'Genre';
  games: Array<Game>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** An example field added by the generator */
  testField: Scalars['String'];
};

/** An object with an ID. */
export type Node = {
  /** ID of the object. */
  id: Scalars['ID'];
};

export type Platform = Node & {
  __typename?: 'Platform';
  games: Array<Game>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['ISO8601DateTime']>;
};

export type Profile = Node & {
  __typename?: 'Profile';
  clips: Array<Clip>;
  createdAt: Scalars['ISO8601DateTime'];
  description: Scalars['String'];
  displayName: Scalars['String'];
  id: Scalars['ID'];
  photoUrl: Scalars['String'];
  reviewLikes: Array<ReviewLike>;
  reviews: Array<Review>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type Publisher = Node & {
  __typename?: 'Publisher';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Find a game by ID */
  game: Game;
  /** Fetch all games */
  games: Array<Game>;
  /** Find all genres */
  genres: Array<Genre>;
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
};


export type QueryGameArgs = {
  id: Scalars['ID'];
};


export type QueryGamesArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryProfileArgs = {
  id: Scalars['ID'];
};


export type QueryReviewArgs = {
  id: Scalars['ID'];
};

export type Review = Node & {
  __typename?: 'Review';
  body: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  game: Game;
  id: Scalars['ID'];
  profile: Profile;
  rating: Scalars['Float'];
  updatedAt: Scalars['ISO8601DateTime'];
};

export type ReviewLike = Node & {
  __typename?: 'ReviewLike';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  liker: Profile;
  review: Review;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type GameQueryVariables = Exact<{
  gameId: Scalars['ID'];
}>;


export type GameQuery = { __typename?: 'Query', game: { __typename?: 'Game', id: string, title: string, imageUrl?: string | null, publishedAt?: string | null, ratingAverage: number, reviews: Array<{ __typename?: 'Review', body: string, rating: number, createdAt: string }> } };


export const GameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"game"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"game"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"ratingAverage"}}]}}]}}]} as unknown as DocumentNode<GameQuery, GameQueryVariables>;