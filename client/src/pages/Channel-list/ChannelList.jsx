import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_ALL_CHANNELS } from "../../utils/queries";
import { Dialog, DialogBody, Avatar } from "@material-tailwind/react";
import { MessageContext } from "../../utils/MessageContext.jsx";

const ChannelList = ({ open, handleOpen }) => {
     const { loading, error, data } = useQuery(GET_ALL_CHANNELS);
     const [channels, setChannels] = useState([]);
     const { setMessageData } = useContext(MessageContext);
     const navigate = useNavigate();

     useEffect(() => {
          if (data) {
               setChannels(data.getAllChannels);
          }
     }, [data]);

     const handleAddChannel = async (channelId) => {
          try {
               navigate("/");
               setMessageData({ id: channelId, type: "channel" });
               handleOpen(); // Close the dialog
          } catch (error) {
               console.error("Error adding channel:", error);
          }
     };

     const handleImageError = (e) => {
          e.target.src = "https://avatars.githubusercontent.com/u/47702913";
     };

     if (loading) return <p>Loading...</p>;
     if (error) return <p>Error fetching channels: {error.message}</p>;

     if (channels.length === 0) {
          return <p>No channels found.</p>;
     }
     const style = {
          dialogBody:
               "flex flex-col flex-grow rounded-lg shadow-inset shadow-2xl inner dark:bg-gradient-to-tr dark:from-sky-950 dark:to-sky-800 min-h-[50vh] border-solid border-4 border-blue-800 bg-gradient-to-tr from-green-100 to-sky-900",
          outerContainer:
               "custom-scrollbar flex-grow flex flex-row flex-wrap justify-center rounded-lg overflow-y-scroll overflow-hidden shadow-lg max-h-[60vh] ",
          avatarAndName: "flex flex-col items-center relative m-2",
          avatar: "w-full h-full m-1 border-2 border-white dark:border-te100 z-0",
          textDiv: "w-full flex items-center justify-center p-3",
          text: "z-10 text-center text-white bg-black bg-opacity-80 px-2 py-1 rounded font-PressStart2P text-md break-words",
     };

     return (
          <>
               <Dialog open={open} handler={handleOpen}>
                    <DialogBody className={style.dialogBody}>
                         <div className={style.outerContainer}>
                              {channels.map((channel) => {
                                   const onButtonClick = () => handleAddChannel(channel._id, { key: "value" });
                                   return (
                                        <div key={channel._id} className={style.avatarAndName}>
                                             <div className="w-36 h-36">
                                                  <Avatar
                                                       className={style.avatar}
                                                       src={channel.image}
                                                       alt={channel.name}
                                                       onError={handleImageError}
                                                       onClick={onButtonClick}
                                                  />
                                             </div>
                                             <div className={style.textDiv}>
                                                  <p className={style.text}>{channel.name}</p>
                                             </div>
                                        </div>
                                   );
                              })}
                         </div>
                    </DialogBody>
               </Dialog>
          </>
     );
};

export default ChannelList;
