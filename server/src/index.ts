import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { connect } from "mongoose";
import { AuthResolver } from "./resolvers/authReslover";
import { InvitationsResolver } from "./resolvers/invitationsResolver";
import { RoomResolver } from "./resolvers/roomResolver";
import loggerMiddleware from "./middleware/redirect";

(async () => {
  const app = express();
  const port = 4000 || process.env.PORT;

  app.get("/", loggerMiddleware, (_req, res) => {
    res.redirect(
      process.env.NODE_ENV === "production"
        ? "https://ipgrabber.vercel.app"
        : "http://localhost:3000/"
    );
  });

  app.get("/notfound", (_req, res) => {
    res.send("<h1>Room Does Not Exist</h1>");
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        AuthResolver,
        InvitationsResolver,
        RoomResolver,
      ],
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  await connect(process.env.DB_URL!);

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(port, () => {
    console.log(`Listening on http://127.0.0.1:${port}`);
  });
})();
