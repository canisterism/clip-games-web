import "reflect-metadata";

import { GameResolver } from "@/graphql/backend/resolvers/GameResolver";
import { ReviewResolver } from "@/graphql/backend/resolvers/ReviewResolver";
import { ContextType } from "@/graphql/backend/resources/ContextType";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-micro";
import { GraphQLSchema } from "graphql";
import { NextApiRequest, NextApiResponse } from "next";
import { buildSchemaSync } from "type-graphql";

export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

const schema: GraphQLSchema = buildSchemaSync({
  resolvers: [ReviewResolver, GameResolver],

  validate: false,
  emitSchemaFile: true,
});

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }): ContextType => {
    const headers = req.headers as NextApiRequest["headers"];
    const authorization = headers["authorization"];
    console.log({ authorization });
    return { prisma: prisma };
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
