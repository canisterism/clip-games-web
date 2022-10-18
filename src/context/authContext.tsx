import { clientInitializedAuth } from "@/src/config/firebase";
import { User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<{ user: User | null }>({ user: null });

export const useAuthContext = () => {
  useContext(AuthContext);
};

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);

  const value = {
    user: user,
  };

  useEffect(() => {
    const unsubscribe = clientInitializedAuth.onAuthStateChanged((user) => {
      console.debug("Auth State Has Changed. user: ");
      console.dir(user);
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
