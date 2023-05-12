import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Navigation } from "@/components/Navigation";
import { Game, GameDocument } from "../graphql/generated/graphql";

const Home: NextPage<{ games: Game[] }> = ({ games }) => {
  return (
    <div>
      <Head>
        <title>clip-games</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navigation></Navigation>
        <div className="mx-8 my-4">
          <GamesGrid games={games}></GamesGrid>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const GAME_IDS: string[] = [
    "Z2lkOi8vYXBwbGljYXRpb24vR2FtZS9wa0NhUWlhRGE3TnlSRll0d1o4VQ",
  ];

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL,
    cache: new InMemoryCache(),
  });

  const games = await Promise.all(
    GAME_IDS.map(async (gameId) => {
      const { data } = await client.query({
        query: GameDocument,
        variables: { gameId },
      });
      return data.game;
    })
  );

  return {
    props: {
      games,
    },
  };
};

export default Home;

const GamesGrid: React.FC<{ games: Game[] }> = ({ games }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {games.map((game) => (
        <GamePackage key={game.id} game={game} />
      ))}
    </div>
  );
};

export const GamePackage: React.FC<{ game: Game }> = ({ game }) => {
  console.dir(game);
  return (
    <div>
      <div className="flex flex-col">
        <Image
          src={
            game.imageUrl
              ? `${game.imageUrl}`
              : "https://placeimg.com/320/400/any"
          }
          alt={`${game.title}`}
          width="320"
          height="400"
        ></Image>
        <span>{game.title}</span>
        <span>発売日：{game.publishedAt}</span>
        <span>☆ {game.ratingAverage}</span>
      </div>
    </div>
  );
};
