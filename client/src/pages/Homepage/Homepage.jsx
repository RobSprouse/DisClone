import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../utils/queries";
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
     const { loading, error, data } = useQuery(GET_USER);
     const navigate = useNavigate();

     useEffect(() => {
          if (data) {
               setUser(data.user);
          }
     }, [data]);

     if (loading) {
          return <div>Loading...</div>;
     }

     if (error) {
          return <div>Error! {error.message}</div>;
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
                                             <div className={style.channelGroup}
                                             key={channel._id}
                                             onClick={() => retrieveMessages(channel._id, "channel")}
                                             >
                                             <Avatar
                                                  variant="circular"
                                                  alt="user 1"
                                                  className="border-2 border-white hover:z-10 focus:z-10"
                                                  src={channel.image}
                                             />
                                                  <Typography className={style.channelName}>{channel.name}</Typography>
                                             </div>
                                        ))}
                                   </div>

                                   <Typography className="font-bold text-2xl text-center mb-2 pt-4">Conversations</Typography>
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
