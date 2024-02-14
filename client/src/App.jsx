import React, { useState, useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { createApolloClient } from "./utils/apolloClient";
import { ApolloProvider, useQuery } from "@apollo/client";
import { ThemeProvider } from "@material-tailwind/react";
import AccessTokenContext from "./utils/AccessTokenContext";
import NavigationBar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { REFRESH_TOKEN_QUERY } from "./utils/queries.js";
import { MessageProvider } from "./utils/MessageContext.jsx";

import "./app.css";

function RefreshTokenComponent() {
     const { loading, refetch } = useQuery(REFRESH_TOKEN_QUERY, { fetchPolicy: "network-only" });

     useEffect(() => {
          const interval = setInterval(() => {
               refetch();
          }, 600000); // 10 minutes
          return () => clearInterval(interval);
     }, [refetch]);

     if (loading) return <></>;
     return <></>;
}

function App() {
     const [accessToken, setAccessToken] = useState(null);
     const [isLoading, setIsLoading] = useState(true);
     const location = useLocation();

     const client = useMemo(() => createApolloClient(accessToken), [accessToken]);
     const contextValue = useMemo(() => ({ accessToken, setAccessToken }), [accessToken, setAccessToken]);

     useEffect(() => {
          const token = Cookies.get("access_token");
          if (token) {
               setAccessToken(token);
          }
          setIsLoading(false);
     }, [location]);

     if (isLoading) return <></>;

     return (
          <ApolloProvider client={client}>
               <AccessTokenContext.Provider value={contextValue}>
                    <React.StrictMode>
                         <MessageProvider>
                              <ThemeProvider>
                                   <div className="flex flex-row justify-center dark:bg-slate-950 rootDiv">
                                        <div className="flex flex-col appDiv">
                                             <NavigationBar />
                                             <Outlet />
                                             <Footer />
                                             <RefreshTokenComponent />
                                        </div>
                                   </div>
                              </ThemeProvider>
                         </MessageProvider>
                    </React.StrictMode>
               </AccessTokenContext.Provider>
          </ApolloProvider>
     );
}

export default App;
