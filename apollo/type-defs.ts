import { Config, gql } from "apollo-server-micro";

export const typeDefs: Config["typeDefs"] = gql`
  type Game {
    id: ID
    title: String
  }

  type Query {
    getGame(id: ID): Game
    getGames: [Game]
  }
`;
