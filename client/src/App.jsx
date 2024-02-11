import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { createApolloClient } from "./utils/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@material-tailwind/react";
import AccessTokenContext from "./utils/AccessTokenContext";
import NavigationBar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import SignUpForm from "./components/SignupForm/SignupForm.jsx";
import "./app.css";

function App() {
     const [accessToken, setAccessToken] = useState(null);
     const [showSignUp, setShowSignUp] = useState(false);
     const [isLoading, setIsLoading] = useState(true);
     const location = useLocation();

     const client = useMemo(() => createApolloClient(accessToken), [accessToken]);

     useEffect(() => {
          const token = Cookies.get("access_token"); // read the access token from the cookie
          if (token) {
               setAccessToken(token);
          }
          setIsLoading(false); // Set isLoading to false after reading the token
     }, [location]);

     const toggleShowSignUp = useCallback(() => {
          setShowSignUp((prevShowSignUp) => !prevShowSignUp);
     }, []);

     // If isLoading is true, render a loading message or spinner
     if (isLoading) return <></>;

     return (
          <ApolloProvider client={client}>
               <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
                    <React.StrictMode>
                         <ThemeProvider>
                              <div
                                   style={{
                                        border: "2px solid lime",
                                        minHeight: "100vh",
                                        display: "flex",
                                        flexDirection: "column",
                                   }}
                              >
                                   <NavigationBar />
                                   <div style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
                                        {accessToken ? <Outlet /> : showSignUp ? <SignUpForm /> : <LoginForm />}
                                        {!accessToken && (
                                             <button onClick={toggleShowSignUp}>
                                                  {showSignUp ? "Go to Login" : "Go to Sign Up"}
                                             </button>
                                        )}
                                   </div>
                                   <Footer />
                              </div>
                         </ThemeProvider>
                    </React.StrictMode>
               </AccessTokenContext.Provider>
          </ApolloProvider>
     );
}

export default App;
