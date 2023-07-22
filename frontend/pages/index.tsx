import GameList from "@/components/GameList";
import { createApolloClient } from "@/graphql/client";
import { NextPage } from "next";
import { withUserTokenSSR } from "next-firebase-auth";
import Head from "next/head";
import { GamesDocument, GamesQuery } from "../graphql/generated/graphql";

type Games = GamesQuery["games"]["nodes"];

const Home: NextPage<{ games: Games }> = ({ games }) => {
  return (
    <div>
      <Head>
        <title>clip-games</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-8 my-4">
        <GameList games={games} />
      </div>
    </div>
  );
};

export const getServerSideProps = withUserTokenSSR()(async ({ user }) => {
  const token = (await user?.getIdToken(true)) ?? null;

  const client = createApolloClient(token);
  const {
    data: { games },
  } = await client.query({
    query: GamesDocument,
    variables: {
      first: 5,
    },
  });

  return {
    props: {
      games: games.nodes,
    },
  };
});

export default Home;
