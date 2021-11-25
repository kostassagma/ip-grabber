import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";

(async () => {
  const app = express();
  const port = 4000 || process.env.PORT;

  app.get("/", (_req, res) => {
    res.send(`<a href="/graphql">Grapqhl</a>`);
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(port, () => {
    console.log(`Listening on http://127.0.0.1:${port}`);
  });
})();
