import { useLocation } from "react-router-dom";
import { GET_MESSAGES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { Avatar } from "@material-tailwind/react";
let empty = [];

const Messages = () => {
     const location = useLocation();
     const [messages, setMessages] = useState([]);
     const [typeData, setTypeData] = useState(); // renamed from data to queryData
     const { type, id } = location.state; // COMMENT: either is conversation or channel

     const { loading, error, data } = useQuery(GET_MESSAGES, { variables: { id, type }, fetchPolicy: "no-cache" });

     useEffect(() => {
          if (data) {
               setMessages(data.getMessages.messages);
               setTypeData(data.getMessages.data); // use setQueryData here
          }
     }, [data]);

     if (loading) return <p>Loading...</p>;
     if (error) return <p>Error: {error.message}</p>;

     return (
          <>
               {!loading &&
                    messages.map((message) => (
                         <div key={message._id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-200 mb-2">
                              <Avatar key={message.user?._id} src={message.user?.image} />
                              <div>
                                   {message.user?._id}
                                   {message.user?.image}
                              </div>
                              <div>
                                   <p className="font-semibold">{message.user?.username}</p>
                                   <p>{message.text}</p>
                              </div>
                              <p className="text-sm text-gray-500">{message.timestamp}</p>
                         </div>
                    ))}
          </>
     );
};
export default Messages;
