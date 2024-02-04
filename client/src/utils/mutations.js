// COMMENT: imports gql from apollo/client needed to define the mutations
import { gql } from "@apollo/client";

// COMMENT: defines the login mutation and exports it
export const LOGIN_USER = gql`
     mutation login($username: String!, $password: String!) {
          login(username: $username, password: $password) {
               accessToken
          }
     }
`;

// COMMENT: defines the signup mutation and exports it
export const SIGNUP_USER = gql`
     mutation SignupUser(
          $username: String!
          $email: String!
          $password: String!
          $firstName: String!
          $lastName: String!
          $image: String
     ) {
          signup(
               username: $username
               email: $email
               password: $password
               firstName: $firstName
               lastName: $lastName
               image: $image
          ) {
               accessToken
          }
     }
`;

export const LOGOUT_USER = gql`
     mutation {
          logout
     }
`;
