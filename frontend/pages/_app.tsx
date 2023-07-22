import { SideBarLayout } from "@/components/layouts";
import { initAuth } from "@/config/firebase";
import { ApolloProvider } from "@/context/apolloContext";
import { MeProvider } from "@/context/meContext";
import { withUser } from "next-firebase-auth";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../styles/global.css";

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider>
      <MeProvider>
        <SideBarLayout>
          <Component {...pageProps} />
        </SideBarLayout>
      </MeProvider>
    </ApolloProvider>
  );
}

export default withUser<AppProps>()(MyApp);
