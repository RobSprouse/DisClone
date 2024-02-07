import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../utils/queries";

const Homepage = () => {
     const [user, setUser] = useState(null);
     const { loading, error, data } = useQuery(GET_USER);

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

     return (
          <div>
               {user && (
                    <>
                         <h1>Welcome {user.username}</h1>
                         <h2>Channels</h2>
                         {user.channels.map((channel) => (
                              <div key={channel._id}>
                                   <p className={style.channelName}>{channel.name}</p>
                                   <img className={style.channelImage} src={channel.image} alt={channel.name} />
                              </div>
                         ))}
                         <h2>Conversations</h2>
                         {user.conversations.map((conversation) => (
                              <div key={conversation._id}>
                                   <h3>Conversation ID: {conversation._id}</h3>
                                   {conversation.members
                                        .filter((member) => member._id !== user._id)
                                        .map((member) => (
                                             <div key={member._id}>
                                                  <h4>{member.username}</h4>
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
     );
};

export default Homepage;
