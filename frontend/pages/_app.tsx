import { SideBarLayout } from "@/components/layouts";
import { ApolloProvider } from "@/context/apolloContext";
import { AuthProvider } from "@/context/authContext";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ApolloProvider>
        <SideBarLayout>
          <Component {...pageProps} />
        </SideBarLayout>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default MyApp;
