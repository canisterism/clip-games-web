import { clientInitializedAuth } from "@/config/firebase";
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

// TODO: Firebase Authの認証情報をそのまま使わずに、サーバーサイドからプロフィールを取得するようにする
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

        // サーバーサイドにトークンを送信して保存する
        if (token) {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });

          if (!response.ok) {
            console.error("Failed to save token");
            console.error(response);
            // TODO: エラーハンドリング
          }
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
