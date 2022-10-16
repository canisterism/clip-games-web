import { gql } from "@apollo/client";
export default gql`
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
