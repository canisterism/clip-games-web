import { Config } from "apollo-server-micro";

const DB = {
  games: [
    { id: 1, title: "foo" },
    { id: 2, title: "bar" },
  ],
};

export const resolvers: Config["resolvers"] = {
  Query: {
    getGame: (_: any, { id }: { id: number }) => {
      console.dir(id);
      const games = DB.games?.filter((a) => a.id === id);
      return games ? games[0] : [];
    },
    getGames: () => DB.games,
  },
};
