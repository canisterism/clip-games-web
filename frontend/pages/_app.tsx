import { SideBarLayout } from "@/components/layouts";
import { initAuth } from "@/config/firebase";
import { AlgoliaContext } from "@/context/algoliaContext";
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
        <AlgoliaContext>
          <SideBarLayout>
            <Component {...pageProps} />
          </SideBarLayout>
        </AlgoliaContext>
      </MeProvider>
    </ApolloProvider>
  );
}

export default withUser<AppProps>()(MyApp);
