import { useEffect, useState, useCallback, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../utils/queries";
import { Typography, Avatar, Tooltip } from "@material-tailwind/react";
import "./sidebar.css";
import { MessageContext } from "../../utils/MessageContext.jsx";

const Sidebar = () => {
     const [user, setUser] = useState(null);
     const { loading, error, data } = useQuery(GET_USER);

     const { setMessageData } = useContext(MessageContext);

     const retrieveMessages = useCallback(
          (id, type) => () => {
               setMessageData({ id, type });
          },
          [setMessageData],
     );

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
               "flex flex-col flex-grow bg-gradient-to-tr from-green-100 to-sky-900 rounded-lg items-center overflow-hidden pt-1 pb-2 shadow-inset shadow-2xl inner dark:bg-gradient-to-tr dark:from-sky-950 dark:to-sky-900 min-h-[30%]", // bg-gradient-to-tr from-green-100 to-blue-900
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
                                             onClick={retrieveMessages(channel._id, "channel")}
                                             onKeyDown={handleKeyDown(channel._id, "channel")}
                                             role="button"
                                             tabIndex={0}
                                        >
                                             <Avatar
                                                  key={channel._id}
                                                  variant="circular"
                                                  alt="user 1"
                                                  className={style.avatar}
                                                  src={channel.image}
                                             />
                                             <Typography key={channel.id} className={style.typography}>
                                                  {channel.name}
                                             </Typography>
                                        </div>
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
                                             <div key={conversation._id} className={style.groupedAvatars}>
                                                  <div key={conversation._id} className={style.overlappedAvatars}>
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
