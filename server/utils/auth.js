// COMMENT: imports the required modules
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";

const secret = process.env.TOKEN_SECRET;
const accessExpiration = "15m"; // COMMENT: 15 minutes
const refreshExpiration = "7d"; // COMMENT: 7 days

// COMMENT: middleware function for authentication
function authMiddleware(req, res, next) {
     const accessToken = req.cookies.access_token; // COMMENT: get access token from cookies

     if (!accessToken) {
          return next();
     }

     try {
          // COMMENT: verify access token and extract user data
          const { data } = jwt.verify(accessToken, secret, { maxAge: accessExpiration });
          req.user = data;
     } catch {
          console.log("Invalid access token");
     }

     // COMMENT: calls the next middleware function
     next();
}

// COMMENT: function to sign a token and return it
function signToken({ username, email, _id }, res) {
     const payload = { username, email, _id };

     const accessToken = jwt.sign({ data: payload }, secret, { expiresIn: accessExpiration });
     const refreshToken = jwt.sign({ data: payload }, secret, { expiresIn: refreshExpiration });

     // COMMENT: sets the tokens as cookies in the response object
     res.cookie("access_token", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // COMMENT: use HTTPS in production
          maxAge: 1000 * 60 * 15, // COMMENT: 15 minutes in milliseconds
     });
     res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // COMMENT: use HTTPS in production
          maxAge: 1000 * 60 * 60 * 24 * 7, // COMMENT: 7 days in milliseconds
     });

     return { accessToken, refreshToken };
}

// COMMENT: exports the defined functions and class
export { authMiddleware, signToken, AuthenticationError };
