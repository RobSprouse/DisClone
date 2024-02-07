import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client"; // Changed from useMutation to useQuery
import { GET_ALL_CHANNELS } from "../../utils/queries";

const ChannelList = () => {
     // Use useQuery instead of useMutation to fetch data (GET_ALL_CHANNELS is a query, not a mutation)
     const { loading, error, data } = useQuery(GET_ALL_CHANNELS); // Use useQuery hook

     const [channels, setChannels] = useState([]); // State variable to store fetched channels

     // useEffect to update channels state when data changes
     useEffect(() => {
          if (data) {
               setChannels(data.getAllChannels.channels); // Update channels state with fetched data
          }
     }, [data]);

     // Render loading state
     if (loading) return <p>Loading...</p>;
     // Render error state
     if (error) return <p>Error fetching channels: {error.message}</p>;

/* COMMENT: the channel object inside the channels array will look like this, didn't grab the users in the channel:
           {
                __typename: "Channel",
                _id: "65c2d27e99b04e13a02a0f34",
                name: "Non Music",
                image: "https://avatars.githubusercontent.com/u/16698336",
              } */

     // Render the component
     return (
          <div>
               <h1>Channels</h1>
               {channels.length > 0 && (
                    <ul>
                         {channels.map((channel) => (
                              // Set a unique key for each list item using the channel's ID
                              <li key={channel.id}>{channel.name}</li>
                         ))}
                    </ul>
               )}
          </div>
     );
};

export default ChannelList;
