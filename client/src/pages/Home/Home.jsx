import React, { useEffect, useCallback, useState, useMemo } from "react";
import Cookies from "js-cookie";
import Messages from "../../components/Messages/Messages.jsx";
import NavigationBar from "../../components/Navbar/Navbar.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import "./home.css";
import { MessageProvider } from "../../utils/MessageContext.jsx";

const Home = () => {
     useEffect(() => {
          const token = Cookies.get("access_token");
          if (token) {
               let intervalId;
               const refreshAccessToken = async () => {
                    const token = Cookies.get("access_token");
                    if (!token) {
                         clearInterval(intervalId);
                         return;
                    }
                    try {
                         const response = await fetch("/refresh_token", {
                              method: "POST",
                              credentials: "include",
                         });
                         if (!response.ok) {
                              throw new Error("Failed to refresh access token");
                         }
                         const data = await response.json();
                         document.cookie = `access_token=${data.accessToken}; max-age=${15 * 60}`;
                    } catch (err) {
                         console.error(err);
                         clearInterval(intervalId);
                    }
               };
               intervalId = setInterval(refreshAccessToken, 1000 * 60 * 10); // Assign the interval to intervalId
               return () => clearInterval(intervalId);
          }
     }, []);

     return (
          <MessageProvider>
               <div className="backgroundImage"></div>
               <div className="flex flex-row  shrink-0 m-w-full max-h-[81vh]">
                    <Sidebar />
                    <Messages className="flex-grow" />
               </div>
          </MessageProvider>
     );
};

export default Home;
