import React, { useState, useMemo } from "react";

export const MessageContext = React.createContext();

export const MessageProvider = ({ children }) => {
     const [messageData, setMessageData] = useState(null);
     const value = useMemo(() => ({ messageData, setMessageData }), [messageData, setMessageData]);
     return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
};
