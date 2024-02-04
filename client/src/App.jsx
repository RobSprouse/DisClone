import { useState, useEffect } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AccessTokenContext from "./utils/AccessTokenContext";
import { Outlet } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const httpLink = createHttpLink({
     uri: "/graphql",
     credentials: "include",
});

function App() {
     const location = useLocation();
     const [accessToken, setAccessToken] = useState(null);
     const [showSignUp, setShowSignUp] = useState(false);

     useEffect(() => {
          const token = Cookies.get("access_token"); // read the access token from the cookie
          if (token) {
               setAccessToken(token);
          }
     }, [location]);

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
                    {accessToken ? <Outlet /> : showSignUp ? <SignUpForm /> : <LoginForm />}
                    {!accessToken && (
                         <button onClick={() => setShowSignUp(!showSignUp)}>
                              {showSignUp ? "Go to Login" : "Go to Sign Up"}
                         </button>
                    )}
               </AccessTokenContext.Provider>
          </ApolloProvider>
     );
}

export default App;
