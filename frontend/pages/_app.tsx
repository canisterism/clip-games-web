import { SideBarLayout } from "@/components/layouts";
// import { ApolloProvider } from "@/context/apolloContext";
// import { AuthProvider } from "@/context/authContext";
import { initAuth } from "@/config/firebase";
import { AuthProvider } from "@/context/authContext";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../styles/global.css";

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SideBarLayout>
        <Component {...pageProps} />
      </SideBarLayout>
    </AuthProvider>
  );
}

export default MyApp;
