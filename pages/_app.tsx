import { client } from "@/graphql/frontend/client";
import { AuthProvider } from "@/src/context/authContext";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
  );
}

export default MyApp;
