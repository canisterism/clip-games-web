import { graphql } from "@/graphql/generated";
import { MeDocument, MeQuery } from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client";
import { ReactNode, createContext } from "react";

export const meQuery = graphql(`
  query me {
    me {
      id
      displayName
      photoUrl
    }
  }
`);

type MeContextType = {
  me: MeQuery["me"];
  loading: boolean;
  error: any;
};
const MeContext = createContext<MeContextType>({} as MeContextType);

type Props = {
  children: ReactNode;
};

export const MeProvider = ({ children }: Props): JSX.Element => {
  const { data, loading, error } = useQuery(MeDocument);
  const me = data?.me ?? null;

  return (
    <MeContext.Provider value={{ me, loading, error }}>
      {children}
    </MeContext.Provider>
  );
};

export default MeContext;
