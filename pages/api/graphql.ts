import "reflect-metadata";

import { customAuthChecker } from "@/graphql/backend/helpers/AuthChecker";
import getUserFromToken from "@/graphql/backend/helpers/firebase/getUserFromToken";
import { GameResolver } from "@/graphql/backend/resolvers/GameResolver";
import { ReviewResolver } from "@/graphql/backend/resolvers/ReviewResolver";
import { ContextType } from "@/graphql/backend/resources/ContextType";
import client from "@/prisma/client";
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
    if (token) await getUserFromToken(token);

    return { prisma: client };
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
