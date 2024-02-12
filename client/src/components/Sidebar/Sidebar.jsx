<<<<<<< HEAD
import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../utils/queries";
import { Link, useNavigate } from "react-router-dom";

function Sidebar({ user }) {
     return (
          <div
               style={{
                    maxWidth: "250px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    height: "100%",
               }}
          >
               <div
                    className="channels"
                    style={{
                         backgroundColor: "lightgray",
                         border: "1px solid black",
                         borderRadius: "8px",
                         // height: "1fr",
                         height: "50%",
                         maxHeight: "400px",
                         overflow: "auto",
                    }}
               >
                    <p>
                         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis nobis accusantium
                         repudiandae dignissimos. Sint assumenda numquam quo quidem adipisci blanditiis minima officiis
                         ad, nulla qui, asperiores exercitationem aliquid deleniti doloribus! Rem officiis vero debitis
                         doloribus consequatur autem enim obcaecati delectus aliquam excepturi iure commodi a ipsum
                         error nulla temporibus, neque quod et, voluptatibus placeat quibusdam corrupti cumque ea
                         dolorum. Qui numquam earum aliquam fuga ducimus ab fugit vero facilis ea nemo. Perspiciatis,
                         vero iure. Totam repellendus porro iure deleniti ipsam. Autem eaque quas tempora in blanditiis
                         laborum similique repellat saepe, odit doloribus praesentium quam expedita suscipit tenetur
                         maxime! Laborum, exercitationem cupiditate a obcaecati omnis nostrum dignissimos doloremque
                         soluta voluptate rem modi mollitia voluptatem nobis, totam id laudantium aut tempore veritatis
                         dolorem quasi necessitatibus. Inventore maxime sint eos earum placeat pariatur totam rem
                         tempore quae eligendi. Omnis, quibusdam earum. Enim adipisci quasi in dolorem autem voluptate
                         facere, quam minima laboriosam non quidem distinctio ad veritatis unde similique velit
                         inventore neque modi nobis, quod aliquam dolore? Et consequatur mollitia sequi beatae eum natus
                         nihil deserunt, consectetur, cumque saepe aperiam iure odio optio ut aliquam illo qui autem
                         incidunt officia. Aliquam consequuntur veniam omnis repellat, quae dolorem, optio magnam
                         laudantium illo repellendus consequatur, itaque harum iure. Possimus natus consequatur suscipit
                         totam. Exercitationem culpa porro, quis iusto amet dolor animi magni. Totam, ex fugiat quia nam
                         tempore quidem aperiam assumenda veniam magni reiciendis dolor libero iste, qui nulla velit
                         veritatis? Asperiores molestias eius quos eaque id nihil dolores saepe dignissimos dolor
                         pariatur earum minus omnis assumenda hic illo recusandae, mollitia ipsam optio nobis.
                         Doloremque voluptates voluptatibus perspiciatis blanditiis ab corporis nam! Quia ducimus atque
                         cupiditate facere quod esse suscipit nihil voluptatum at. Ut, vitae suscipit. Consectetur
                         omnis, delectus necessitatibus, quia corrupti similique eum maxime ex eligendi non sint
                         adipisci optio facere exercitationem molestiae asperiores quo deserunt voluptatem accusamus
                         dolores dignissimos illum unde qui aliquam? Praesentium, iure non repudiandae doloribus quam
                         dolorem magni autem corrupti et, suscipit hic error quaerat quia! Id nam voluptatem nulla
                         explicabo perferendis architecto ipsum aliquam inventore? Iste alias modi, at nobis velit vel
                         pariatur animi reprehenderit molestiae similique consectetur? Amet porro exercitationem,
                         quibusdam nostrum pariatur temporibus voluptatem consequuntur sequi officia impedit ea
                         similique voluptatibus asperiores facere omnis cumque! Impedit debitis aspernatur dolorum est
                         esse incidunt fugit magnam culpa et! Ad magni eum, quis odio reprehenderit voluptatum quod ea
                         neque suscipit fugiat quam doloremque labore, cumque soluta natus facere deserunt tempore.
                    </p>
               </div>

               <div
                    className="conversations"
                    style={{
                         backgroundColor: "lightgray",
                         // height: "1fr",
                         height: "50%",
                         border: "1px solid black",
                         borderRadius: "8px",
                         overflow: "auto",
                         maxHeight: "400px",
                    }}
               >
                    <p>
                         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit harum sapiente tempore nemo
                         aliquam rem, aspernatur corrupti distinctio ullam aliquid nihil, et atque saepe rerum ducimus
                         praesentium accusantium consequuntur, molestias veritatis culpa maxime enim velit illum
                         repellendus! Voluptates, sit. Libero dolorem saepe sint excepturi fuga, similique adipisci
                         velit repellendus asperiores. Cum consectetur rem laudantium architecto provident itaque
                         suscipit corrupti qui consequatur nesciunt. Ratione deserunt earum nostrum tempore sapiente
                         voluptatibus, hic dicta praesentium. Aut consectetur eius dolorum, hic totam doloribus iste
                         cumque similique blanditiis id recusandae consequuntur tempora quo nihil doloremque quae
                         deserunt temporibus sequi non commodi. Eum architecto deleniti iure quos dolor omnis distinctio
                         numquam rerum tempora, ut aliquid voluptatem pariatur incidunt. Hic voluptas eveniet, ipsam
                         illo voluptatibus et magnam fugiat! Officia odit nostrum voluptates. Facere saepe quos hic
                         distinctio vitae. Ad cum eaque minima, rerum officiis sapiente mollitia dolores et beatae
                         magnam consequatur, numquam veritatis enim dignissimos voluptatum? Saepe natus provident
                         tempora maiores rem quia eveniet facere. Exercitationem illum error quibusdam quia sapiente
                         eius ipsam! Perferendis quidem quisquam delectus nisi perspiciatis ex, adipisci sunt maiores in
                         vel minus enim molestias accusantium laborum maxime dolore animi veniam, dolorum, officia
                         placeat. Perspiciatis quidem modi velit, in ad, optio consequuntur mollitia dolore corporis aut
                         dolorum aliquam magnam rerum nisi tempora architecto inventore dolor. Perferendis animi
                         officiis inventore obcaecati explicabo autem deserunt veniam aut hic, fuga, beatae, neque et
                         eveniet blanditiis eligendi. Ratione reprehenderit totam nisi iusto numquam officiis itaque
                         modi eveniet aliquid at facere fuga vel, quo et dolor, libero repudiandae molestias
                         voluptatibus necessitatibus tempore reiciendis quos minus. Reiciendis perferendis, cupiditate
                         veritatis consequatur architecto minima debitis veniam laudantium enim minus saepe natus velit
                         voluptates. Doloribus earum iure quidem saepe expedita veniam illum, fugiat dicta corrupti
                         vitae eum vero consectetur aliquam voluptatibus culpa adipisci quas maiores. Saepe nihil
                         possimus ipsa quaerat ea in?
                    </p>
               </div>
          </div>
     );
}
=======
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
          sidebar: "flex flex-col max-h-[80vh] min-w-[21%] bg-teal-100 mt-3 pl-3 m-3 pr-3 rounded-lg pb-3",
          titles: "block font-sans text-2xl antialiased font-semibold leading-tight tracking-normal bg-gradient-to-tr from-blue-500 to-green-500 bg-clip-text text-center mb-2 mt-2",
          typography: "font-bold  text-lg  ",
          outerContainer:
               "flex flex-col min-h-[25vh] bg-gradient-to-tr from-green-100 to-blue-900 rounded-lg items-center overflow-hidden pt-1 pb-2 ",
          groupContainers:
               " custom-scrollbar flex flex-col w-11/12 rounded-lg overflow-y-scroll overflow-hidden p-2 mt-1 pb-5",
          channelGroup:
               " flex flex-row items-center backdrop-blur-sm bg-white/15 rounded-lg cursor-pointer motion-safe:hover:animate-bounce -mb-4 static focus:z-50 ",
          avatar: "m-1 border-2 border-white",
          conversationGroup: "flex flex-row items-center bg-gradient-to-r from-green-400 to-blue-500 rounded-lg  ",
          groupedAvatars:
               " flex flex-row items-center backdrop-blur-sm bg-white/15 rounded-lg p-1 mb-1 cursor-pointer mb-2",
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
                                                  variant="circular"
                                                  alt="user 1"
                                                  className={style.avatar}
                                                  src={channel.image}
                                             />
                                             <Typography className={style.typography}>{channel.name}</Typography>
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
                                             <div className={style.groupedAvatars}>
                                                  <div className={style.overlappedAvatars}>
                                                       {conversation.members
                                                            .filter((member) => member._id !== user._id)
                                                            .map((member) => (
                                                                 <>
                                                                      <Tooltip
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
                                                                 </>
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
>>>>>>> main

export default Sidebar;
