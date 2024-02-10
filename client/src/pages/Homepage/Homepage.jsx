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
          channelName: "font-bold text-2xl",
          channelImage: "size-1/6 rounded-full object-cover object-center",
          memberName: "",
          memberImage: "size-profileImg rounded-full object-cover object-center",
     };

     const retrieveMessages = (id, type) => {
          navigate("/messages", { state: { id, type } });
     };

     return (
          <>
               {/* <Card className="h-full w-full max-w-[12rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-gray-100">
          <div>
               {user && (
                    <>
                         <Typography varient="h5" color="blue-gray " className="font-bold text-xl mb-5">Welcome! {user.username}</Typography>
                         <Typography varient="h5" color="blue-gray " className="font-bold text-xl">Channels</Typography>
                         {user.channels.map((channel) => (
                              <div key={channel._id} onClick={() => retrieveMessages(channel._id, "channel")}>
                                   <p className={style.channelName}>{channel.name}</p>
                                   <img className={style.channelImage} src={channel.image} alt={channel.name} />
                              </div>
                         ))}
                         <Typography varient="h5" color="blue-gray " className="font-bold text-xl mt-8">Conversations</Typography>
                         {user.conversations.map((conversation) => (
                              <div key={conversation._id} onClick={() => retrieveMessages(conversation._id, "conversation")}>
                                   <h3>Conversation ID: {conversation._id}</h3>
                                   {conversation.members
                                        .filter((member) => member._id !== user._id)
                                        .map((member) => (
                                             <div key={member._id}>
                                                  <h4 className="invisible">{member.username}</h4>
                                                  <img
                                                       className={style.memberImage}
                                                       src={member.image}
                                                       alt={member.username}
                                                  />
                                             </div>
                                        ))}
                              </div>
                         ))}
                    </>
               )}
          </div>
         </Card>  */}
               <Card className="h-full w-full max-w-[12rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-gray-100">
                    <div >
                         {user && (
                              <>
                                   {user.conversations.map((conversation) => (
                                        <section className="flex items-center -space-x-7 m-1">
                                             {conversation.members
                                                  .filter((member) => member._id !== user._id)
                                                  .map((member) => (
                                                       <Avatar
                                                            variant="circular"
                                                            alt="user 1"
                                                            className="border-2 border-white hover:z-10 focus:z-10"
                                                            src={member.image}
                                                       />
                                                  ))}
                                        </section>
                                   ))}
                              </>
                         )}
                    </div>
               </Card>
          </>
     );
};

export default Homepage;
