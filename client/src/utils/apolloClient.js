import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

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

     return new ApolloClient({
          link: authLink.concat(httpLink),
          cache: new InMemoryCache(),
     });
}
