import React, { useState, useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { createApolloClient } from "./utils/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@material-tailwind/react";
import AccessTokenContext from "./utils/AccessTokenContext";
import NavigationBar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

import "./app.css";

function App() {
     const [accessToken, setAccessToken] = useState(null);
     const [isLoading, setIsLoading] = useState(true);
     const location = useLocation();

     const client = useMemo(() => createApolloClient(accessToken), [accessToken]);
     const contextValue = useMemo(() => ({ accessToken, setAccessToken }), [accessToken, setAccessToken]);

     useEffect(() => {
          const token = Cookies.get("access_token"); // read the access token from the cookie
          if (token) {
               setAccessToken(token);
          }
          setIsLoading(false); // Set isLoading to false after reading the token
     }, [location]);

     // If isLoading is true, render a loading message or spinner
     if (isLoading) return <></>;

     return (
          <ApolloProvider client={client}>
               <AccessTokenContext.Provider value={contextValue}>
                    <React.StrictMode>
                         <ThemeProvider>
                              <div className="flex flex-col w-full m-12 max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 2xl:px-0">
                                   <NavigationBar />
                                   <Outlet />
                                   <Footer />
                              </div>
                         </ThemeProvider>
                    </React.StrictMode>
               </AccessTokenContext.Provider>
          </ApolloProvider>
     );
}

export default App;
