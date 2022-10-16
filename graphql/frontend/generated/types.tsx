import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Game = {
  __typename?: 'Game';
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  reviews: Array<Review>;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  game?: Maybe<Game>;
};


export type QueryGameArgs = {
  gameId: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  rating?: Maybe<Scalars['Int']>;
};

export type GameQueryVariables = Exact<{
  gameId: Scalars['String'];
}>;


export type GameQuery = { __typename?: 'Query', game?: { __typename?: 'Game', id: string, title: string, imageUrl?: string | null, reviews: Array<{ __typename?: 'Review', content?: string | null, rating?: number | null, createdAt: any }> } | null };


export const GameDocument = gql`
    query game($gameId: String!) {
  game(gameId: $gameId) {
    id
    title
    imageUrl
    reviews {
      content
      rating
      createdAt
    }
  }
}
    `;

/**
 * __useGameQuery__
 *
 * To run a query within a React component, call `useGameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameQuery({
 *   variables: {
 *      gameId: // value for 'gameId'
 *   },
 * });
 */
export function useGameQuery(baseOptions: Apollo.QueryHookOptions<GameQuery, GameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GameQuery, GameQueryVariables>(GameDocument, options);
      }
export function useGameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GameQuery, GameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GameQuery, GameQueryVariables>(GameDocument, options);
        }
export type GameQueryHookResult = ReturnType<typeof useGameQuery>;
export type GameLazyQueryHookResult = ReturnType<typeof useGameLazyQuery>;
export type GameQueryResult = Apollo.QueryResult<GameQuery, GameQueryVariables>;