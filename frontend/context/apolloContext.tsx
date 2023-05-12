import { AuthContext } from "@/context/authContext";
import { createApolloClient } from "@/graphql/client";
import { ApolloProvider as OriginalApolloProvider } from "@apollo/client";
import { ReactNode, useContext } from "react";

type Props = {
  children: ReactNode;
};

export const ApolloProvider = ({ children }: Props): JSX.Element => {
  const { token } = useContext(AuthContext);
  const client = createApolloClient(token);
  return (
    <OriginalApolloProvider client={client}>{children}</OriginalApolloProvider>
  );
};
