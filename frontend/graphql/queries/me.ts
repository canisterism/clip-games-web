import { gql } from "@apollo/client";
export default gql`
  query me {
    me {
      id
      displayName
      photoUrl
    }
  }
`;
