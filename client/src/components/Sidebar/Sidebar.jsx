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

export default Sidebar;
