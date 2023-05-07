import { gql } from "@apollo/client";
export default gql`
  query game($gameId: ID!) {
    game(id: $gameId) {
      id
      title
      imageUrl
      reviews {
        body
        rating
        createdAt
      }
    }
  }
`;
