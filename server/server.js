// COMMENT: imports the required modules
import express from "express";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import { PubSub } from "graphql-subscriptions";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import db from "./config/connection.js";
import { authMiddleware, verifyToken } from "./utils/auth.js";
import { typeDefs, resolvers } from "./schemas/schemas.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { AuthenticationError } from "apollo-server-express";

// COMMENT: creates an instance of PubSub for subscriptions
const pubsub = new PubSub();

// COMMENT: creates an instance of an Express server and sets the port
const app = express();
const PORT = process.env.PORT || 3001;

// COMMENT: sets up the Express app middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // COMMENT: adds cookie parser
app.use(
     cors({
          origin: ["http://localhost:3001", "https://studio.apollographql.com"], // allow requests from both origins // FIXME: change to the production URL when deploying
          credentials: true,
     }),
);
app.use(authMiddleware); // COMMENT: adds the authentication middleware to the middleware stack and is used to authenticate the user

// COMMENT: creates a new Apollo server with the schema and resolvers
const server = new ApolloServer({
     typeDefs: typeDefs,
     resolvers: resolvers,
     cors: {
          origin: "http://localhost:3001",
          credentials: true,
     },
     context: ({ req, res }) => {
          const accessToken = req.accessToken || null;
          const context = { req, res, pubsub };
          try {
               if (accessToken) {
                    context.payLoad = verifyToken(accessToken);
                    context.accessToken = accessToken;
               }
          } catch (error) {
               console.log("Token verification failed:", error);
               throw new AuthenticationError("Invalid token");
          }
          return context;
     },
     subscriptions: {
          onConnect: (connectionParams, webSocket) => {
               if (connectionParams.accessToken) {
                    const validToken = verifyToken(connectionParams.accessToken);
                    if (!validToken) {
                         throw new AuthenticationError("Invalid token");
                    }
                    return { accessToken: connectionParams.accessToken };
               }
               throw new AuthenticationError("Not Authenticated");
          },
     },
});

// COMMENT: serves the static files from the React app
// Only serve the static files from the React app in production
if (process.env.NODE_ENV === "production") {
     app.use(express.static(path.resolve("../client/dist")));

     // COMMENT: sends all requests to the React app
     app.get("*", (req, res) => {
          res.sendFile(path.resolve("../client/dist/index.html"));
     });
}

// COMMENT: starts the Apollo server, applies the Express middleware, and connects to the database
const startApolloServer = async () => {
     await server.start();
     server.applyMiddleware({ app });

     const httpServer = createServer(app);
     SubscriptionServer.create(
          {
               schema: server.schema,
               execute,
               subscribe,
               onConnect: (connectionParams, webSocket, context) => {
                    console.log("Client connected with params:", connectionParams);
               },
               onDisconnect: (webSocket, context) => {
                    console.log("Client disconnected");
               },
          },
          {
               server: httpServer,
               path: server.graphqlPath,
          },
     );

     db.once("open", () => {
          httpServer.listen(PORT, () => {
               console.log(`Server running on ${PORT}!`);
               console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
               console.log(`Subscriptions ready at ws://localhost:${PORT}${server.graphqlPath}`);
          });
     });
};

// COMMENT: starts the Apollo server
startApolloServer();
