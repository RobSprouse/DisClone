// COMMENT: imports the required modules
import express from "express";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import db from "./config/connection.js";
import { authMiddleware, signToken } from "./utils/auth.js";
import jwt from "jsonwebtoken";
import { typeDefs, resolvers } from "./schemas/schemas.js";
import cookieParser from "cookie-parser";

dotenv.config(); // COMMENT: loads environment variables from a .env file into process.env

const secret = process.env.TOKEN_SECRET; // COMMENT: assigns secret to the TOKEN_SECRET environment variable

// COMMENT: creates an instance of an Express server and sets the port
const app = express();
const PORT = process.env.PORT || 3001;

// COMMENT: sets up the Express app middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // COMMENT: adds cookie parser to the middleware stack for use with JWT
app.use(authMiddleware); // COMMENT: adds the authentication middleware to the middleware stack

// COMMENT: serves the static files from the React app
if (process.env.NODE_ENV === "production") {
     app.use(express.static(path.resolve("client/dist")));
}

// COMMENT: endpoint to refresh the token
app.post("/refresh_token", (req, res) => {
     const refreshToken = req.cookies.refresh_token;

     if (!refreshToken) {
          return res.sendStatus(401); // COMMENT: Unauthorized
     }

     try {
          const { data } = jwt.verify(refreshToken, secret);
          const newTokens = signToken(data, res); // COMMENT: If verification is successful, sign a new token and send it back
          res.json(newTokens);
     } catch (err) {
          console.error("Invalid refresh token", err);
          res.sendStatus(403); // COMMENT: Forbidden
     }
});

// COMMENT: sends all requests to the React app
app.get("*", (req, res) => {
     res.sendFile(path.resolve("client/dist/index.html"));
});

// COMMENT: creates a new Apollo server with the schema and resolvers
const server = new ApolloServer({
     typeDefs: typeDefs,
     resolvers: resolvers,
     context: ({ req }) => {
          return { user: req.user }; // COMMENT: adds the user to the context so it can be accessed in the resolvers i.e. req.user.id, req.user.username, req.user.email
     },
});

// COMMENT: starts the Apollo server, applies the Express middleware, and connects to the database
const startApolloServer = async () => {
     await server.start();
     server.applyMiddleware({ app });

     db.once("open", () => {
          app.listen(PORT, () => {
               console.log(`Server running on port ${PORT}!`);
               console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
          });
     });
};

// COMMENT: starts the Apollo server
startApolloServer();
