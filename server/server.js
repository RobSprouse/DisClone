// COMMENT: imports the required modules
import express from "express";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import db from "./config/connection.js";
import { authMiddleware, signToken } from "./utils/auth.js";
// import jwt from "jsonwebtoken"; // COMMENT: may not be needed her
import { typeDefs, resolvers } from "./schemas/schemas.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config(); // COMMENT: loads environment variables from a .env file into process.env

// COMMENT: creates an instance of an Express server and sets the port
const app = express();
const PORT = process.env.PORT || 3001;

// COMMENT: sets up the Express app middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // COMMENT: adds cookie parser
app.use(
     cors({
          origin: ["http://localhost:3001", "https://studio.apollographql.com"], // allow requests from both origins
          credentials: true,
     }),
);
app.use(authMiddleware); // COMMENT: adds the authentication middleware to the middleware stack and is used to authenticate the user

// COMMENT: creates a new Apollo server with the schema and resolvers
const server = new ApolloServer({
     typeDefs: typeDefs,
     resolvers: resolvers,
     cors: {
          origin: "http://localhost:3001", // replace with your GraphQL server's origin
          credentials: true,
     },
     context: ({ req }) => {
          return  req ; // COMMENT: adds the user to the context so it can be accessed in the resolvers i.e. req.user.id, req.user.username, req.user.email
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

     db.once("open", () => {
          app.listen(PORT, () => {
               console.log(`Server running on port ${PORT}!`);
               console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
          });
     });
};

// COMMENT: starts the Apollo server
startApolloServer(typeDefs, resolvers);

// const secret = process.env.TOKEN_SECRET; // COMMENT: assigns secret to the TOKEN_SECRET environment variable

/* COMMENT: Shouldn't need this because the JWT access token will refresh in the middleware if the access token is valid when the user makes a request
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
}); */
