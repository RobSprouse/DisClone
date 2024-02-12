import { useContext, useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Avatar, Input, Typography } from "@material-tailwind/react";
import { CiPlay1 } from "react-icons/ci";
import { GET_MESSAGES } from "../../utils/queries";
import { ADD_MESSAGE } from "../../utils/mutations";
import { MessageContext } from "../../utils/MessageContext.jsx";

const Messages = () => {
     const { messageData } = useContext(MessageContext);
     const [messages, setMessages] = useState([]);
     const [typeData, setTypeData] = useState();
     const [inputText, setInputText] = useState("");
     const messagesEndRef = useRef(null);

     useEffect(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
     }, [messages]);

     const style = {
          messagesContainer:
               "flex flex-col overflow-y-scroll w-full  bg-teal-100 mt-3 pl-3 rounded-lg pb-3 custom-scrollbar",
          avatar: "m-1 border-2 border-white",
          typography: "font-bold  text-sm",
          inputForm: "flex flex-row items-center rounded-lg relative bottom-0 fixed p-2 w-full bg-teal-100 mt-3 pl-3 m-3 pr-3 rounded-lg pb-3",
          sendIcon:
               "text-gray-500 cursor-pointer hover:text-gray-700 transition duration-200 ease-in-out transform hover:scale-125 hover:rotate-180",
     };

     function convertDate(timestamp) {
          const date = new Date(parseInt(timestamp));
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

     const [addMessage] = useMutation(ADD_MESSAGE, {
          onCompleted: (data) => {
               setMessages((prevMessages) => [...prevMessages, data.addMessage]);
          },
     });

     const handleAddMessage = async () => {
          try {
               await addMessage({ variables: { text: inputText, ...messageData } });
               setInputText("");
          } catch (err) {
               console.error("Error adding message", err);
          }
     };

     const { loading, error, data } = useQuery(GET_MESSAGES, {
          variables: messageData,
          fetchPolicy: "cache-and-network",
     });

     useEffect(() => {
          if (data) {
               setMessages(data.getMessages.messages);
               setTypeData(data.getMessages.data);
          }
     }, [data]);

     if (loading) return <p>Loading...</p>;
     if (error) return <></>;

     return (
          <>
               {" "}
               <div className="flex flex-col max-h-[80h] items-center w-full">
                    <div className={style.messagesContainer}>
                         <div>
                              {!loading &&
                                   messages.map((message) => (
                                        <div key={message._id} className={style.message}>
                                             <Avatar
                                                  key={message.user?._id}
                                                  src={message.user?.image}
                                                  className={style.avatar}
                                             />
                                             <div>
                                                  <Typography className={style.typography}>
                                                       {message.user?.username}
                                                  </Typography>
                                                  <p>{message.text}</p>
                                             </div>
                                             <p className="text-sm text-gray-500">{convertDate(message.timestamp)}</p>
                                        </div>
                                   ))}
                              <div ref={messagesEndRef} />
                         </div>
                    </div>
                    <form
                         onSubmit={(e) => {
                              e.preventDefault(); // Prevent the form from refreshing the page
                              handleAddMessage();
                         }}
                         className={style.inputForm}
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
                              className={style.sendIcon}
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
