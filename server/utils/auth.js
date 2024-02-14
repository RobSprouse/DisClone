// COMMENT: imports the required modules
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";
import dotenv from "dotenv";

dotenv.config(); // COMMENT: loads environment variables from a .env file into process.env

const secret = process.env.TOKEN_SECRET; // COMMENT: sets the secret key for the tokens
const accessExpiration = "15m"; // COMMENT: 15 minutes
const refreshExpiration = "7d"; // COMMENT: 7 days
let consoleLogCount = 0;
function addToConsoleCount() {
     consoleLogCount++;
     return consoleLogCount;
}

// COMMENT: function to sign a token and return it
function signToken({ username, email, _id }, res) {
     const payload = { username, email, _id };

     const accessToken = jwt.sign({ data: payload }, secret, { expiresIn: accessExpiration });
     const refreshToken = jwt.sign({ data: payload }, secret, { expiresIn: refreshExpiration });

     // COMMENT: sets the refresh token in a cookie
     res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // use HTTPS in production
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'none' for cross-origin, 'lax' for same-origin
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in milliseconds
     });

     // COMMENT: sets the access token in a cookie
     res.cookie("access_token", accessToken, {
          httpOnly: false, // make it accessible from JavaScript
          secure: process.env.NODE_ENV === "production", // use HTTPS in production
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'none' for cross-origin, 'lax' for same-origin
          maxAge: 1000 * 60 * 15,  
     });


     return { accessToken };
}

// COMMENT: middleware function for authentication
function authMiddleware(req, res, next) {
     const authHeader = req.headers.authorization;
     const accessToken = authHeader && authHeader.split(" ")[1];
     const refreshToken = req.cookies.refresh_token;

     if (!accessToken) {
          if (!refreshToken) {
               // console.log("No refresh token");
               return next();
          }
          try {
               const { data } = jwt.verify(refreshToken, secret);
               // console.log("Refresh token verified");
               const { accessToken: newAccessToken, refreshToken: newRefreshToken } = signToken(data, res);
               req.accessToken = newAccessToken;
               req.cookies.refresh_token = newRefreshToken;
               // console.log("New Refresh and Access tokens set in cookie");
               addToConsoleCount();
               // console.log(consoleLogCount)
               return next();
          } catch (error) {
               // console.log("Not authenticated: ", error.message);
               res.clearCookie("access_token");
               res.clearCookie("refresh_token");
               return next();
          }
     } else {
          try {
               jwt.verify(accessToken, secret);
               const { data } = jwt.verify(refreshToken, secret);
               // const { refreshToken: newRefreshToken } = signToken(data, res);
               // req.cookies.refresh_token = newRefreshToken;
               req.accessToken = accessToken;
               // console.log("Access token verified");
               addToConsoleCount();
               // console.log(consoleLogCount)
               return next();
          } catch (error) {
               // console.log("Not authenticated: ", error.message);
               res.clearCookie("access_token");
               res.clearCookie("refresh_token");
               return next();
          }
     }
}

const verifyToken = (token) => {
     if (token) {
          try {
               return jwt.verify(token, secret);
          } catch (err) {
               throw new AuthenticationError("Not authenticated");
          }
     }
};

// COMMENT: exports the defined functions and class
export { authMiddleware, signToken, AuthenticationError, verifyToken };
