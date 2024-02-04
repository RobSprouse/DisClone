import { useState, useEffect, useCallback, useMemo } from "react";
import AccessTokenContext from "./utils/AccessTokenContext";
import { Outlet, useLocation } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import SignUpForm from "./components/SignupForm/SignupForm.jsx";
import Cookies from "js-cookie";
import { createApolloClient } from "./utils/apolloClient";
import { ApolloProvider } from "@apollo/client";

function App() {
     const [accessToken, setAccessToken] = useState(null);
     const [showSignUp, setShowSignUp] = useState(false);
     const location = useLocation();

     const client = useMemo(() => createApolloClient(accessToken), [accessToken]);

     useEffect(() => {
          const token = Cookies.get("access_token"); // read the access token from the cookie
          if (token) {
               setAccessToken(token);
          }
     }, [location]);

     const toggleShowSignUp = useCallback(() => {
          setShowSignUp((prevShowSignUp) => !prevShowSignUp);
     }, []);

     return (
          <ApolloProvider client={client}>
               <AccessTokenContext.Provider value={setAccessToken}>
                    {accessToken ? <Outlet /> : showSignUp ? <SignUpForm /> : <LoginForm />}
                    {!accessToken && (
                         <button onClick={toggleShowSignUp}>{showSignUp ? "Go to Login" : "Go to Sign Up"}</button>
                    )}
               </AccessTokenContext.Provider>
          </ApolloProvider>
     );
}

export default App;
