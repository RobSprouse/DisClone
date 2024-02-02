import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AccessTokenContext } from "./utils/AccessTokenContext.js";

const httpLink = createHttpLink({
     uri: "/graphql",
});

function App() {
     const [accessToken, setAccessToken] = useState(null);

     const authLink = setContext((_, { headers }) => {
          return {
               headers: {
                    ...headers,
                    authorization: accessToken ? `Bearer ${accessToken}` : "",
               },
          };
     });

     const client = new ApolloClient({
          link: authLink.concat(httpLink),
     });

     return (
          <ApolloProvider client={client}>
               <AccessTokenContext.Provider value={setAccessToken}>
                    <Outlet />
               </AccessTokenContext.Provider>
          </ApolloProvider>
     );
}

export default App;
