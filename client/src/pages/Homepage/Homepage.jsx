// COMMENT: Import necessary dependencies
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../utils/queries";

const Homepage = ({ userId }) => {
     // COMMENT: Fetch user data
     const { loading, error, data } = useQuery(GET_USER, {
          variables: { _id: userId },
     });

     // COMMENT: Display loading message while data is being fetched
     if (loading) return <p>Loading...</p>;
     // COMMENT: Display error message if there is an error fetching data
     if (error) return <p>Error :(</p>;

     // COMMENT: Destructure user data
     const { user } = data;

     return (
          <div>
               <h2>Channels</h2>
               <ul>
                    {user.channels.map((channel) => (
                         <li key={channel._id}>
                              <img src={channel.image} alt={channel.name} />
                              <p>{channel.name}</p>
                         </li>
                    ))}
               </ul>

               <h2>Conversations</h2>
               <ul>
                    {user.conversations.map((conversation) => (
                         <li key={conversation._id}>
                              {conversation.members.map((member) => (
                                   <div key={member._id}>
                                        <img src={member.image} alt={member.username} />
                                        <p>{member.username}</p>
                                   </div>
                              ))}
                         </li>
                    ))}
               </ul>
          </div>
     );
};

export default Homepage;
