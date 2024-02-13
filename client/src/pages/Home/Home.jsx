import React, { useEffect, useCallback, useState, useMemo } from "react";
import Cookies from "js-cookie";
import Messages from "../../components/Messages/Messages.jsx";
import NavigationBar from "../../components/Navbar/Navbar.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import "./home.css";
import { MessageProvider } from "../../utils/MessageContext.jsx";

const Home = () => {

     
     return (
          <MessageProvider>
               <div className="flex flex-row flew-grow shrink-0 max-h-[81vh] min-h-[1000px] ">
                    <Sidebar />
                    <Messages />
               </div>
          </MessageProvider>
     );
};

export default Home;
