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
