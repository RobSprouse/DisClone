import { useEffect, useState, useCallback, useContext } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_USER } from "../../utils/queries";
import { Typography, Avatar, Tooltip, Badge } from "@material-tailwind/react";
import "./sidebar.css";
import { MessageContext } from "../../utils/MessageContext.jsx";
import MESSAGE_ADDED from "../../utils/subscriptions";

function ChannelSubscription({ channelId, onNewMessage, currentUserId }) {
     // COMMENT: ChannelSubscription
     const { data: subscriptionData } = useSubscription(MESSAGE_ADDED, {
          variables: { channelId },
     });
     const { messageData, setMessageData } = useContext(MessageContext);
     useEffect(() => {
          if (subscriptionData?.messageAdded) {
               // console.log(subscriptionData);
               // console.log("subscribe to channel", channelId);
               // Check if the new message was sent by the current user
               if (subscriptionData.messageAdded.user._id === currentUserId) {
                    // If so, return without notifying
                    return;
               }
               // setMessageData({ id: channelId, type: "channel" });
               // Handle the new message data here
               // You might want to add it to your messageData context
               // Notify parent component of new message
               onNewMessage(channelId);
          }
     }, [subscriptionData, channelId, onNewMessage, currentUserId]);

     // Render nothing
     return null;
}
const Sidebar = () => {
     const [user, setUser] = useState(null);
     const { loading, error, data, refetch } = useQuery(GET_USER, { fetchPolicy: "cache-and-network" });

     const { messageData, setMessageData } = useContext(MessageContext);

     // State to track new messages by channel ID
     const [newMessages, setNewMessages] = useState({});

     const handleNewMessage = useCallback(
          // COMMENT: Handle new message
          (channelId) => {
               refetch(); // Refetch the data
               setNewMessages((prev) => {
                    const count = prev[channelId] ? prev[channelId] + 1 : 1;
                    return { ...prev, [channelId]: count };
               });
          },
          [refetch],
     );

     // Callback to clear new message notification
     const clearNewMessage = useCallback((channelId) => {
          setNewMessages((prev) => {
               const newMessages = { ...prev };
               delete newMessages[channelId];
               return newMessages;
          });
     }, []);

     const retrieveMessages = useCallback(
          (id, type) => () => {
               setMessageData({ id, type });
          },
          [setMessageData],
     );
     const handleImageError = (e) => {
          e.target.src = "https://avatars.githubusercontent.com/u/47702913";
     };

     const handleKeyDown = useCallback(
          (id, type) => (event) => {
               if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    retrieveMessages(id, type)();
               }
          },
          [retrieveMessages],
     );

     useEffect(() => {
          if (data) {
               setUser(data.user);
          }
     }, [data]);

     useEffect(() => {
          refetch();
     }, [messageData, refetch]);

     if (loading) {
          return <div>Loading...</div>;
     }

     if (error) {
          return <div>Error! {error.message}</div>;
     }

     const style = {
          sidebar: "flex flex-col flex-grow min-w-[250px] max-w-[25%] bg-teal-100 mt-3 pl-3 m-3 pr-3 rounded-lg pb-3 dark:bg-sky-950 dark:text-teal-100 min-h-[89vh] shadow-lg overflow-hidden overflow-y-scroll xCustom-scrollbar",
          titles: "block font-sans text-2xl antialiased font-semibold leading-tight tracking-normal bg-gradient-to-tr from-blue-500 to-green-500 bg-clip-text text-center mb-2 mt-2 font-PressStart2P text-md",
          typography: "font-bold  text-lg ",
          outerContainer:
               "flex flex-col flex-grow bg-gradient-to-tr from-green-100 to-sky-900 rounded-lg items-center overflow-hidden pt-1 pb-2 shadow-inset shadow-2xl inner dark:bg-gradient-to-tr dark:from-sky-950 dark:to-sky-900 min-h-[30%]",
          groupContainers:
               " custom-scrollbar flex-grow  flex flex-col w-11/12 rounded-lg overflow-y-scroll overflow-hidden p-2 mt-1 pb-5 shadow-lg",
          channelGroup:
               " flex flex-row flex-grow  items-center backdrop-blur-sm bg-white/15 rounded-lg cursor-pointer motion-safe:hover:animate-bounce -mb-4 static focus:z-50 overflow-hidden overflow-x-auto xCustom-scrollbar min-h-[25%]",
          avatar: "m-1 border-2 border-white dark:border-teal-100",
          groupedAvatars:
               " flex flex-row backdrop-blur-sm bg-white/15 rounded-lg p-1 mb-1 cursor-pointer mb-2 overflow-hidden justify-center overflow-x-auto xCustom-scrollbar shadow-lg",
          overlappedAvatars: "flex items-center -space-x-6 p-1",
          conversationMember: "motion-safe:hover:animate-bounce focus:z-50 static",
          tooltip: {
               mount: { scale: 1.1, y: -5, x: 70 },
               unmount: { scale: 4, y: 50, x: 700 },
          },
          tooltipStyle: "bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-2 m-1 align-left ",
     };

     return (
          <>
               {user && (
                    <div className={style.sidebar}>
                         <Typography className={style.titles}>Channels</Typography>
                         <div className={style.outerContainer}>
                              <div className={style.groupContainers}>
                                   {user.channels.map((channel) => (
                                        <div
                                             className={style.channelGroup}
                                             key={channel._id}
                                             onClick={() => {
                                                  // COMMENT: On click
                                                  retrieveMessages(channel._id, "channel")();
                                                  clearNewMessage(channel._id);
                                             }}
                                             onKeyDown={handleKeyDown(channel._id, "channel")}
                                             role="button"
                                             tabIndex={0}
                                        >
                                             <>
                                                  <Avatar
                                                       variant="circular"
                                                       alt={channel.name}
                                                       className={style.avatar}
                                                       src={channel.image}
                                                       onError={handleImageError}
                                                  />
                                                  {newMessages[channel._id] && (
                                                       <Badge
                                                            color="red"
                                                            content={newMessages[channel._id]}
                                                            placement="top "
                                                            className="p-1 animate-pulse absolute -top-4 right-2 "
                                                       />
                                                  )}
                                             </>

                                             <Typography className={style.typography}>{channel.name}</Typography>
                                        </div>
                                   ))}
                                   {data &&
                                        data.user.channels.map((channel) => (
                                             <ChannelSubscription
                                                  key={channel._id}
                                                  channelId={channel._id}
                                                  onNewMessage={handleNewMessage}
                                                  currentUserId={user._id.toString()} // Pass the userId of the current user
                                             />
                                        ))}
                              </div>
                         </div>

                         <Typography className={style.titles}>Conversations</Typography>
                         <div className={style.outerContainer}>
                              <div className={style.groupContainers}>
                                   {user.conversations.map((conversation) => (
                                        <div
                                             key={conversation._id}
                                             onClick={retrieveMessages(conversation._id, "conversation")}
                                             onKeyDown={handleKeyDown(conversation._id, "channel")}
                                             role="button"
                                             tabIndex={0}
                                        >
                                             <div className={style.groupedAvatars}>
                                                  <div className={style.overlappedAvatars}>
                                                       {conversation.members
                                                            .filter((member) => member._id !== user._id)
                                                            .map((member, index) => (
                                                                 <div key={index}>
                                                                      <Tooltip
                                                                           key={member._id}
                                                                           content={member.username}
                                                                           animate={style.tooltip}
                                                                           className={style.tooltipStyle}
                                                                      >
                                                                           <Avatar
                                                                                key={member._id}
                                                                                variant="circular"
                                                                                alt="user 1"
                                                                                className={
                                                                                     (style.avatar,
                                                                                     style.conversationMember)
                                                                                }
                                                                                src={member.image}
                                                                                onError={handleImageError}
                                                                           />
                                                                      </Tooltip>
                                                                 </div>
                                                            ))}
                                                  </div>
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         </div>
                    </div>
               )}
          </>
     );
};

export default Sidebar;
