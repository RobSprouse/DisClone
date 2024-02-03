import { useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AccessTokenContext from "./utils/AccessTokenContext";
import { Outlet } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm.jsx";

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
          cache: new InMemoryCache(),
     });

     return (
          <ApolloProvider client={client}>
               <AccessTokenContext.Provider value={setAccessToken}>
                    {accessToken ? <Outlet /> : <LoginForm />}
               </AccessTokenContext.Provider>
          </ApolloProvider>
     );
}

export default App;
