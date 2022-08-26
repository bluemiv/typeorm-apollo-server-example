import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { buildSchema } from 'type-graphql';
import UserResolver from './resolvers/user-resolver';
import PostgresDataSource from './data-source';

const createSchema = () =>
  buildSchema({
    resolvers: [UserResolver],
  });

const startApolloServer = async () => {
  await PostgresDataSource.initialize();

  const schema = await createSchema();

  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app });
  httpServer.listen(4000, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
};

startApolloServer();
