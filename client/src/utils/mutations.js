// COMMENT: imports gql from apollo/client needed to define the mutations for the client side
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

export const ADD_CHANNEL = gql`
     mutation AddChannel($name: String!, $image: String) {
          addChannel(name: $name, image: $image) {
               _id
               name
               image
          }
     }
`;

export const ADD_MESSAGE = gql`
     mutation AddMessage($text: String!, $id: ID!, $type: String!) {
          addMessage(text: $text, id: $id, type: $type) {
               _id
               text
               user {
                    _id
                    username
                    image
               }
               timestamp
               updatedAt
          }
     }
`;