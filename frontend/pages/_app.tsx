import { SideBarLayout } from "@/components/layouts";
import { initAuth } from "@/config/firebase";
import { ApolloProvider } from "@/context/apolloContext";
import { AuthProvider } from "@/context/authContext";
import { withUser } from "next-firebase-auth";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../styles/global.css";

initAuth();

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

export default withUser<AppProps>()(MyApp);
