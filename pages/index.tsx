import { Navigation } from "@/components/Navigation";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>clip-games</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation></Navigation>

      <main>
        <h1> clip-games</h1>
      </main>
    </div>
  );
};

export default Home;
