import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { GET_ALL_CHANNELS } from "../../utils/queries";

const ChannelList = () => {
    // Define state variables using React hooks
    const [getAllChannels] = useMutation(GET_ALL_CHANNELS); // Mutation hook for fetching channels
    const [channels, setChannels] = useState([]); // State variable to store fetched channels

    // Effect hook to fetch channels when the component mounts or the getAllChannels function changes
    useEffect(() => {
        // Function to fetch channels from the server
        const fetchChannels = async () => {
            try {
                // Execute the getAllChannels mutation query and await the response
                const { data } = await getAllChannels();
                // Update the channels state with the fetched data
                setChannels(data.getAllChannels);
            } catch (error) {
                console.error("Error fetching channels:", error);
            }
        };

        // Call the fetchChannels function when the component mounts or getAllChannels function changes
        fetchChannels();
    }, [getAllChannels]); // Dependency array ensures the effect runs only when getAllChannels changes

    // Render the component
    return (
        <div>
            <h1>Channels</h1>
            <ul>
                {/* Map over the channels array and render each channel as a list item */}
                {channels.map((channel) => (
                    // Set a unique key for each list item using the channel's ID
                    <li key={channel.id}>{channel.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ChannelList;
