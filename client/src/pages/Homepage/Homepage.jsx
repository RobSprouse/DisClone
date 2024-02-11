import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../utils/queries";
import MESSAGE_ADDED from "../../utils/subscriptions";
import { useSubscription } from "@apollo/client";

import {
     Card,
     Typography,
     List,
     ListItem,
     ListItemPrefix,
     ListItemSuffix,
     Chip,
     Accordion,
     AccordionHeader,
     AccordionBody,
     Alert,
     Avatar,
     Badge,
     Button,
} from "@material-tailwind/react";
import {
     PresentationChartBarIcon,
     ShoppingBagIcon,
     UserCircleIcon,
     Cog6ToothIcon,
     InboxIcon,
     PowerIcon,
} from "@heroicons/react/24/solid";
import {
     ChevronRightIcon,
     ChevronDownIcon,
     CubeTransparentIcon,
     MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

const Homepage = () => {
     const [user, setUser] = useState(null);
     const [newChannelMessages, setNewChannelMessages] = useState({});
     const [newConversationMessages, setNewConversationMessages] = useState({});
     const navigate = useNavigate();

     const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER);

     useEffect(() => {
          if (userData) {
               console.log("User data:", userData.user); // Log user data
               setUser(userData.user);
          }
     }, [userData]);

     const {
          data: subscriptionData,
          loading: subscriptionLoading,
          error: subscriptionError,
     } = useSubscription(MESSAGE_ADDED, {
          variables: {
               userId: user ? user._id : null,
               channelId: user && user.channels.length > 0 ? user.channels[0]._id : null,
               conversationId: user && user.conversations.length > 0 ? user.conversations[0]._id : null,
          },
          skip: !user, // Skip subscription if user is not yet loaded
          onData: ({ subscriptionData }) => {
               console.log("onData called", subscriptionData); // Add this line
               console.log("New message data:", subscriptionData.data);
               const { messageAdded } = subscriptionData.data;
               if (messageAdded.channelId) {
                    setNewChannelMessages((prev) => ({
                         ...prev,
                         [messageAdded.channelId]: (prev[messageAdded.channelId] || 0) + 1,
                    }));
               } else if (messageAdded.conversationId) {
                    setNewConversationMessages((prev) => ({
                         ...prev,
                         [messageAdded.conversationId]: (prev[messageAdded.conversationId] || 0) + 1,
                    }));
               }
          },
     });

     useEffect(() => {
          if (subscriptionData) {
               console.log("User data:", subscriptionData.user); // Log user data
               setUser(subscriptionData.user);
          }
     }, [subscriptionData]);

     if (userLoading) {
          return <div>Loading...</div>;
     }

     if (userError ) {
          return <div>Error! {(userError || subscriptionError).message}</div>;
     }

     const style = {
          channelName: "font-bold text-lg cursor-pointer",
          channelImage: "size-1/6 rounded-full object-cover object-center cursor-pointer",
          memberName: "",
          memberImage: "size-profileImg rounded-full object-cover object-center cursor-pointer",
          channelGroup: "inline-flex gap-2 items-center cursor-pointer",
          sidebar: "h-sidebar",
     };

     const retrieveMessages = (id, type) => {
          navigate("/messages", { state: { id, type } });
          if (type === "channel") {
               setNewChannelMessages((prev) => ({
                    ...prev,
                    [id]: 0,
               }));
          } else if (type === "conversation") {
               setNewConversationMessages((prev) => ({
                    ...prev,
                    [id]: 0,
               }));
          }
     };

     return (
          <>
               <Card className="h-full w-full max-w-[12rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-gray-100">
                    <div>
                         {user && (
                              <div className={style.sidebar}>
                                   <Typography className="font-bold text-2xl text-center mb-2">Channels</Typography>
                                   <div className="flex flex-col min-h-channelBar max-h-channelBar overflow-hidden hover:overflow-scroll">
                                        {user.channels.map((channel) => (
                                             <div
                                                  className={style.channelGroup}
                                                  key={channel._id}
                                                  onClick={() => retrieveMessages(channel._id, "channel")}
                                             >
                                                  <Badge content={newChannelMessages[channel._id] || 0}>
                                                       <Avatar
                                                            variant="circular"
                                                            alt="user 1"
                                                            className="border-2 border-white hover:z-10 focus:z-10"
                                                            src={channel.image}
                                                       />
                                                  </Badge>
                                                  <Typography className={style.channelName}>{channel.name}</Typography>
                                             </div>
                                        ))}
                                   </div>

                                   <Typography className="font-bold text-2xl text-center mb-2 pt-4">
                                        Conversations
                                   </Typography>
                                   <div className="flex flex-col min-h-conversationBar max-h-conversationBar overflow-hidden hover:overflow-scroll">
                                        {user.conversations.map((conversation) => (
                                             <div
                                                  key={conversation._id}
                                                  onClick={() => retrieveMessages(conversation._id, "conversation")}
                                             >
                                                  <section className="flex items-center -space-x-7 m-1">
                                                       {conversation.members
                                                            .filter((member) => member._id !== user._id)
                                                            .map((member) => (
                                                                 <Avatar
                                                                      variant="circular"
                                                                      alt="user 1"
                                                                      className="border-2 border-white hover:z-10 focus:z-10 cursor-pointer"
                                                                      src={member.image}
                                                                 />
                                                            ))}
                                                  </section>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         )}
                    </div>
               </Card>
          </>
     );
};

export default Homepage;
