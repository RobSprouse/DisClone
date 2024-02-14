import { ApolloClient, InMemoryCache, createHttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = createHttpLink({
     uri: "/graphql",
     credentials: "include",
});

export function createApolloClient(accessToken) {
     const authLink = setContext((_, { headers }) => {
          return {
               headers: {
                    ...headers,
                    authorization: accessToken ? `Bearer ${accessToken}` : "",
               },
          };
     });

     const wsLink = new WebSocketLink({
          uri:
               import.meta.env.VITE_APP_ENV === "production"
                    ? `wss://radiant-crag-99170-330c9e6a9c97.herokuapp.com/graphql`
                    : `ws://localhost:3001/graphql`,
          options: {
               reconnect: true,
               connectionParams: {
                    authToken: accessToken,
               },
          },
     });

     const link = split(
          ({ query }) => {
               const definition = getMainDefinition(query);
               return definition.kind === "OperationDefinition" && definition.operation === "subscription";
          },
          wsLink,
          authLink.concat(httpLink),
     );

     return new ApolloClient({
          link: link,
          cache: new InMemoryCache({
               dataIdFromObject: (object) => object.key || null,
          }),
     });
}
