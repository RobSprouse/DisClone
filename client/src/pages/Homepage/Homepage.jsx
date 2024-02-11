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
import Sidebar from "../../components/Sidebar/Sidebar";

const Homepage = () => {
     const [user, setUser] = useState(null);
     const { loading, error, data } = useQuery(GET_USER,  );
     const navigate = useNavigate();

     useEffect(() => {
          console.log("oh man", data);
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
          cardDiv: "h-full w-full max-w-[12rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-gray-100",
          sidebar: "h-sidebar m-h-siderbar",
          overflowArea: "flex flex-col min-h-channelBar max-h-channelBar hover:overflow-scroll overflow-hidden",
          channelName: "font-bold text-lg cursor-pointer",
          channelImage: "size-1/6 rounded-full object-cover object-center cursor-pointer",
          memberName: "",
          memberImage: "size-profileImg rounded-full object-cover object-center cursor-pointer",
          channelGroup: "inline-flex gap-2 items-center cursor-pointer hover:bg-teal-50 rounded-lg",
          cardTitles: "font-bold text-2xl text-center mb-2",
          avatarStyle: "border-2 border-white hover:z-10 focus:z-10",
          avatarGroup: "flex items-center -space-x-7 m-1 hover:bg-teal-50 rounded-lg",
     };

     const retrieveMessages = (id, type) => {
          navigate("/messages", { state: { id, type } });
     };

     return (
          // <>
          //      <Card className={style.cardDiv}>
          //           <div>
          //                {user && (
          //                     <div className={style.sidebar}>
          //                          <Typography className={style.cardTitles}>Channels</Typography>
          //                          <div className={style.overflowArea}>
          //                               {user.channels.map((channel) => (
          //                                    <div
          //                                         className={style.channelGroup}
          //                                         key={channel._id}
          //                                         onClick={() => retrieveMessages(channel._id, "channel")}
          //                                    >
          //                                         <Avatar
          //                                              variant="circular"
          //                                              alt="user 1"
          //                                              className={style.avatarStyle}
          //                                              src={channel.image}
          //                                         />
          //                                         <Typography className={style.channelName}>{channel.name}</Typography>
          //                                    </div>
          //                               ))}
          //                          </div>

          //                          <Typography className={style.cardTitles}>Conversations</Typography>
          //                          <div className={style.overflowArea}>
          //                               {user.conversations.map((conversation) => (
          //                                    <div
          //                                         key={conversation._id}
          //                                         onClick={() => retrieveMessages(conversation._id, "conversation")}
          //                                    >
          //                                         <section className={style.avatarGroup}>
          //                                              {conversation.members
          //                                                   .filter((member) => member._id !== user._id)
          //                                                   .map((member) => (
          //                                                        <Avatar
          //                                                             variant="circular"
          //                                                             alt="user 1"
          //                                                             className="border-2 border-white hover:z-10 focus:z-10 cursor-pointer"
          //                                                             src={member.image}
          //                                                        />
          //                                                   ))}
          //                                         </section>
          //                                    </div>
          //                               ))}
          //                          </div>
          //                     </div>
          //                )}
          //           </div>
          //      </Card>
          // </>
          <div style={{ border: "2px solid red", display: "flex", flexGrow: "1" }}>
               <Sidebar user={user} />
               <div>content</div>
          </div>
     );
};

export default Homepage;
