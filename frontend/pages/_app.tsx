import { ApolloProvider } from "@/context/apolloContext";
import { AuthProvider } from "@/context/authContext";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ApolloProvider>
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
  );
}

export default MyApp;
