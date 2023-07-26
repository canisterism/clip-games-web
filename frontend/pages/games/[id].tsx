import GameImage from "@/components/Game/GameImage";
import RatingStars from "@/components/Game/RatingStars";
import StatButton from "@/components/StatButton";
import { createApolloClient } from "@/graphql/client";
import { GameDocument, GameQuery } from "@/graphql/generated/graphql";
import { gql } from "@apollo/client";
import { BookmarkIcon, PaintBrushIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { withUserTokenSSR } from "next-firebase-auth";
import Head from "next/head";

type PageProps = {
  game: GameQuery["game"];
  errorCode: string;
};

export const gameWithReviewsQuery = gql`
  query game($gameId: ID!) {
    game(id: $gameId) {
      id
      title
      imageUrl
      reviewsCount
      clipsCount
      publishedAt
      ratingAverage
      reviews {
        ...ReviewListItemFragment
      }
    }
  }
`;

export function Game({ game }: PageProps) {
  return (
    <div>
      <Head>
        <title>{game.title} | clip-games</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex gap-5 mx-8 my-4">
        <div className="flex-col">
          <GameImage imageUrl={game.imageUrl || undefined} title={game.title} />
          <StatButton
            icon={
              <PaintBrushIcon
                className="-ml-0.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            }
            label="レビュー"
            stat={`${game.reviewsCount}`}
            onClick={() => {
              console.log("レビュー");
            }}
          />

          <StatButton
            icon={
              <BookmarkIcon
                className="-ml-0.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            }
            label="クリップ"
            stat={`${game.clipsCount}`}
          />
        </div>
        <div className="flex flex-col gap-3 text-gray-100">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">{game.title}</h1>
            {game.publishedAt && (
              <h3 className="text-lg">
                発売日：{format(new Date(game.publishedAt), "yyyy-MM-dd")}
              </h3>
            )}
          </div>
          <RatingStars ratingAverage={game.ratingAverage} size="lg" />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withUserTokenSSR()(
  async ({ user, query }) => {
    const { id } = query;
    if (typeof id !== "string") {
      return {
        notFound: true,
      };
    }

    const token = (await user?.getIdToken()) || null;
    const client = createApolloClient(token);

    const { data } = await client.query({
      query: GameDocument,
      variables: {
        gameId: id,
      },
    });
    const game = data.game;
    return { props: { game } };
  }
);
export default Game;
