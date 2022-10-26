import { clientInitializedAuth } from "@/src/frontend/config/firebase";
import { User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext<{
  user: User | undefined;
  token: string | undefined;
}>({ user: undefined, token: undefined });

export const useAuthContext = () => {
  useContext(AuthContext);
};

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);

  const value = {
    user: user,
    token: token,
  };

  useEffect(() => {
    const unsubscribe = clientInitializedAuth.onAuthStateChanged(
      async (user) => {
        if (!user) {
          return;
        }
        setUser(user);
        const token = (await user?.getIdToken(true)) ?? null;
        setToken(token);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
