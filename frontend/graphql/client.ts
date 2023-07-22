import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env["NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL"],
});

const generateAuthLink = (token: string | null) => {
  return setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
};

export const createApolloClient = (token: string | null) => {
  const authLink = generateAuthLink(token);
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, httpLink]),
  });
};
