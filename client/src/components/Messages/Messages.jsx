import { useLocation } from "react-router-dom";
import { GET_MESSAGES } from "../../utils/queries";
import { ADD_MESSAGE } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { Avatar, Input } from "@material-tailwind/react";
import { CiPlay1 } from "react-icons/ci";

const Messages = () => {
     const location = useLocation();
     const [messages, setMessages] = useState([]);
     const [typeData, setTypeData] = useState(); // renamed from data to queryData
     const [inputText, setInputText] = useState("");
     const { type, id } = location.state; // COMMENT: either is conversation or channel

     const { loading, error, data } = useQuery(GET_MESSAGES, { variables: { id, type }, fetchPolicy: "no-cache" });

     const [addMessage, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(
          ADD_MESSAGE,
          {
               onCompleted: (data) => {
                    // Add the new message to the local state
                    setMessages((prevMessages) => [...prevMessages, data.addMessage]);
               },
          },
     );

     const handleAddMessage = async () => {
          try {
               await addMessage({ variables: { text: inputText, id, type } });
               setInputText("");
          } catch (err) {
               console.error("Error adding message", err);
          }
     };

     function convertDate(timestamp) {
          // Convert the timestamp to a Date object
          const date = new Date(parseInt(timestamp));

          // Format the date as 'MM/DD/YYYY hh:mmA'
          const formattedDate = date.toLocaleString("en-US", {
               month: "2-digit",
               day: "2-digit",
               year: "numeric",
               hour: "2-digit",
               minute: "2-digit",
               hour12: true,
          });

          return formattedDate;
     }

     useEffect(() => {
          if (data) {
               setMessages(data.getMessages.messages);
               setTypeData(data.getMessages.data);
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
                                   <p className="font-semibold">{message.user?.username}</p>
                                   <p>{message.text}</p>
                              </div>
                              <p className="text-sm text-gray-500">{convertDate(message.timestamp)}</p>
                         </div>
                    ))}
               <div key="" className="flex items-center space-x-3 p-2 rounded-lg bg-gray-200 mb-2">
                    <form
                         onSubmit={(e) => {
                              e.preventDefault(); // Prevent the form from refreshing the page
                              handleAddMessage();
                         }}
                         className="flex items-center space-x-3 p-2 rounded-lg bg-gray-200 mb-2"
                    >
                         <Input
                              type="text"
                              size="regular"
                              placeholder="Write your message"
                              value={inputText} // Bind the input field to inputText
                              onChange={(e) => setInputText(e.target.value)} // Update inputText whenever the input changes
                         />
                         <CiPlay1
                              size={30}
                              className="text-gray-500 cursor-pointer hover:text-gray-700 transition duration-200 ease-in-out transform hover:scale-125 hover:rotate-180"
                              onClick={(e) => {
                                   e.preventDefault(); // Prevent the form from refreshing the page
                                   handleAddMessage();
                              }}
                         />
                    </form>
               </div>
          </>
     );
};
export default Messages;
