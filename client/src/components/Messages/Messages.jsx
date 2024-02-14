import { useContext, useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Avatar, Input, Typography } from "@material-tailwind/react";
import { CiPlay1 } from "react-icons/ci";
import { GET_MESSAGES } from "../../utils/queries";
import { ADD_MESSAGE } from "../../utils/mutations";
import { MessageContext } from "../../utils/MessageContext.jsx";
import "./messages.css";

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
               "flex flex-col flex-end custom-scrollbar shrink-0 overflow-auto max-h-[90%] flex bg-teal-100 mt-3 pl-3 rounded-lg ",
          avatar: "m-1 border-2 border-white",
          typography: " flex  font-bold text-sm text-wrap ",
          inputForm: "flex flex-row items-center rounded-lg w-full bg-teal-100 rounded-lg max-h-[55px] mt-3 p-1",
          sendIcon:
               "text-gray-500 cursor-pointer hover:text-gray-700 transition duration-200 ease-in-out transform hover:scale-125 hover:rotate-180",
          messageDiv: "flex flex-col  items-left p-2 ml-1 bg-white/15 rounded-lg shadow-lg",
          messageText: " text-md text-wrap",
          timestamp: "text-sm text-gray-500",
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
          fetchPolicy: "network-only",
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
          fetchPolicy: "network-only",
          skip: !messageData,
     });

     useEffect(() => {
          if (data) {
               setMessages(data.getMessages.messages);
               setTypeData(data.getMessages.data);
          }
     }, [data]);

     if (loading) return <p>Loading...</p>;
     if (error) return <></>;

     if (data)
          return (
               <>
                    <div className="flex flex-col max-h-[9%] mr-3 mb-2 ">
                         <div className={style.messagesContainer}>
                              {!loading &&
                                   messages.map((message) => (
                                        <div key={message._id} className={style.messageDiv}>
                                             <Avatar
                                                  key={message.user?._id}
                                                  src={message.user?.image}
                                                  className={style.avatar}
                                             />
                                             <div>
                                                  <Typography className={style.typography}>
                                                       {message.user?.username}
                                                  </Typography>
                                                  <Typography className={style.messageText}>{message.text}</Typography>
                                             </div>
                                             <p className={style.timestamp}>{convertDate(message.timestamp)}</p>
                                        </div>
                                   ))}
                              <div ref={messagesEndRef} />
                         </div>
                         <form
                              onSubmit={(e) => {
                                   e.preventDefault();
                                   handleAddMessage();
                              }}
                              className={style.inputForm}
                         >
                              <Input
                                   type="text"
                                   size="md"
                                   placeholder="Write your message"
                                   value={inputText}
                                   onChange={(e) => setInputText(e.target.value)}
                              />
                              <CiPlay1
                                   size={30}
                                   className={style.sendIcon}
                                   onClick={(e) => {
                                        e.preventDefault();
                                        handleAddMessage();
                                   }}
                              />
                         </form>
                    </div>
               </>
          );
};
export default Messages;
