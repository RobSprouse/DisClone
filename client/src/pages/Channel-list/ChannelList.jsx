import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_CHANNELS } from "../../utils/queries";

const ChannelList = () => {
     const { loading, error, data } = useQuery(GET_ALL_CHANNELS);
     const [channels, setChannels] = useState([]);

     useEffect(() => {
          if (data) {
               setChannels(data.getAllChannels.channels);
          }
     }, [data]);

     const handleAddChannel = async (channelId, payload) => {
          try {
               // Your logic for adding a channel with payload data
               console.log("Adding channel with ID:", channelId);
               console.log("Payload:", payload);
          } catch (error) {
               console.error("Error adding channel:", error);
          }
     };

     if (loading) return <p>Loading...</p>;
     if (error) return <p>Error fetching channels: {error.message}</p>;

     if (channels.length === 0) {
          return <p>No channels found.</p>;
     }
     const style = {
          channelName: "font-bold text-2xl",
          channelImage: "size-1/6 rounded-full object-cover object-center",
          memberName: "",
          memberImage: "size-profileImg rounded-full object-cover object-center",
     };

     return (
          <div>
               <h1>Channels</h1>
               <ul>
                    {channels.map((channel) => (
                         <li key={channel._id}>
                              <div key={channel._id}>
                                   <p className={style.channelName}>{channel.name}</p>
                                   <img className={style.channelImage} src={channel.image} alt={channel.name} />
                              </div>
                              <button onClick={() => handleAddChannel(channel._id, { key: "value" })}>
                                   Add Channel
                              </button>
                         </li>
                    ))}
               </ul>
          </div>
     );
};

export default ChannelList;
