import { MeDocument, MeQuery } from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client";
import { ReactNode, createContext } from "react";

type MeContextType = {
  me: MeQuery["me"] | null; // Userも多分必要なので後で考える
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
