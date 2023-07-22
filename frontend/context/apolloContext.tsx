import { createApolloClient } from "@/graphql/client";
import { ApolloProvider as OriginalApolloProvider } from "@apollo/client";
import { useUser } from "next-firebase-auth";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

export const ApolloProvider = ({ children }: Props): JSX.Element => {
  const user = useUser();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      user.getIdToken().then((token) => {
        setToken(token);
      });
    }
  }, [user]);

  const client = createApolloClient(token);
  return (
    <OriginalApolloProvider client={client}>{children}</OriginalApolloProvider>
  );
};
