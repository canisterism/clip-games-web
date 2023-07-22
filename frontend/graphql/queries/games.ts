import { gql } from "@apollo/client";
export default gql`
  query games($first: Int, $last: Int, $before: String, $after: String) {
    games(first: $first, last: $last, before: $before, after: $after) {
      nodes {
        id
        title
        imageUrl
        reviewsCount
        clipsCount
        publishedAt
        ratingAverage
      }
    }
  }
`;
