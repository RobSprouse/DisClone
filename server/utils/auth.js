// COMMENT: imports the required modules
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";

const secret = process.env.TOKEN_SECRET;
const accessExpiration = "15m"; // COMMENT: 15 minutes
const refreshExpiration = "7d"; // COMMENT: 7 days

// COMMENT: function to sign a token and return it
function signToken({ username, email, _id }, res) {
     const payload = { username, email, _id };

     const accessToken = jwt.sign({ data: payload }, secret, { expiresIn: accessExpiration });
     const refreshToken = jwt.sign({ data: payload }, secret, { expiresIn: refreshExpiration });

     // COMMENT: sets the refresh token in a cookie
     res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // COMMENT: use HTTPS in production
          maxAge: 1000 * 60 * 60 * 24 * 7, // COMMENT: 7 days in milliseconds
     });

     return { accessToken };
}

// COMMENT: middleware function for authentication
function authMiddleware(req, res, next) {
     // COMMENT: Extract a token from the Authorization header which is the access token
     const authHeader = req.headers.authorization;
     const accessToken = authHeader && authHeader.split(" ")[1]; // Bearer <token>

     if (!accessToken) {
          return next();
     }

     try {
          const refreshToken = req.cookies.refresh_token;
          if (!refreshToken) {
               throw new AuthenticationError("Invalid refresh token");
          }
          const { data } = jwt.verify(refreshToken, secret, { maxAge: accessExpiration });

          // COMMENT: creates a new access token and attaches it to the response.locals object
          const newTokens = signToken(data, res);
          res.locals.newAccessToken = newTokens.accessToken; // COMMENT: attaches the new access token to the response

          req.user = data; // COMMENT: passed to the context object in ApolloServer for the resolvers to use
     } catch {
          console.log("Invalid access token");
     }

     // COMMENT: Call the next middleware function
     next();
}

// COMMENT: exports the defined functions and class
export { authMiddleware, signToken, AuthenticationError };
