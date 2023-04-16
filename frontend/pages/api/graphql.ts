import "reflect-metadata";

import { customAuthChecker } from "@/archive/backend/graphql/helpers/AuthChecker";
import getUserFromToken from "@/archive/backend/graphql/helpers/firebase/getUserFromToken";
import { GameResolver } from "@/archive/backend/graphql/resolvers/GameResolver";
import { ReviewResolver } from "@/archive/backend/graphql/resolvers/ReviewResolver";
import { ContextType } from "@/archive/backend/graphql/resources/ContextType";
import { default as prisma } from "@/archive/backend/prisma/client";
import { ApolloServer } from "apollo-server-micro";
import { GraphQLSchema } from "graphql";
import { NextApiRequest, NextApiResponse } from "next";
import { buildSchemaSync } from "type-graphql";

export const config = {
  api: {
    bodyParser: false,
  },
};

const schema: GraphQLSchema = buildSchemaSync({
  resolvers: [ReviewResolver, GameResolver],
  authChecker: customAuthChecker,
  validate: false,
  emitSchemaFile: true,
});

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req }): Promise<ContextType> => {
    const headers = req.headers as NextApiRequest["headers"];
    const token = headers["authorization"]?.replace("Bearer ", "");
    const user = token ? await getUserFromToken(token) : undefined;

    return {
      prisma: prisma,
      user: user,
    };
  },
});

const startServer = apolloServer.start();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST");

  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
};

export default handler;
