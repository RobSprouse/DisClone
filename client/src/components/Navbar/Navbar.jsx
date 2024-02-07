import { Navbar, Typography, Button, Menu, MenuHandler, MenuList, MenuItem, Avatar } from "@material-tailwind/react";
import { UserCircleIcon, ChevronDownIcon, PowerIcon } from "@heroicons/react/24/solid";
import React, { useContext, useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";
import AccessTokenContext from "../../utils/AccessTokenContext";
import { LOGOUT_USER } from "../../utils/mutations";
import { GET_USER } from "../../utils/queries";
import "./Navbar.css";
import { Link } from "react-router-dom";

// profile menu component
const profileMenuItems = [
     {
          label: "My Profile",
          icon: UserCircleIcon,
     },

     {
          label: "Sign Out",
          icon: PowerIcon,
     },
];

function ProfileMenu() {
     const [isMenuOpen, setIsMenuOpen] = React.useState(false);
     const { accessToken, setAccessToken } = useContext(AccessTokenContext);
     const [logout] = useMutation(LOGOUT_USER);

     const { loading, error, data } = useQuery(GET_USER, {
          skip: !accessToken,
     });

     const handleLogout = useCallback(async () => {
          try {
               await logout();
               setAccessToken(null);
          } catch (error) {
               console.error("Failed to logout:", error);
          }
     }, [logout, setAccessToken]);

     const closeMenu = () => setIsMenuOpen(false);

     if (loading) return null;
     if (error) return `Error! ${error}`;

     return (
          <>
               <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                    <MenuHandler>
                         <Button
                              variant="text"
                              color="blue-gray"
                              className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                         >
                              <Avatar
                                   variant="circular"
                                   size="sm"
                                   alt="tania andrew"
                                   className="border border-gray-900 p-0.5"
                                   src={data.user.image}
                              />
                              <ChevronDownIcon
                                   strokeWidth={2.5}
                                   className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                              />
                         </Button>
                    </MenuHandler>
                    <MenuList className="p-1">
                         {profileMenuItems.map(({ label, icon }, key) => {
                              const isLastItem = key === profileMenuItems.length - 1;
                              return (
                                   <MenuItem
                                        key={label}
                                        onClick={(closeMenu, isLastItem ? handleLogout : undefined)}
                                        className={`flex items-center gap-2 rounded ${
                                             isLastItem
                                                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                                  : ""
                                        }`}
                                   >
                                        {React.createElement(icon, {
                                             className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                             strokeWidth: 2,
                                        })}

                                        <Typography
                                             as="span"
                                             variant="small"
                                             className="font-normal"
                                             color={isLastItem ? "red" : "inherit"}
                                        >
                                             {label}
                                        </Typography>
                                   </MenuItem>
                              );
                         })}
                    </MenuList>
               </Menu>
          </>
     );
}

export default function NavigationBar() {
     // const [isNavOpen, setIsNavOpen] = React.useState(false);
     // const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
     const { accessToken } = useContext(AccessTokenContext);

     // React.useEffect(() => {
     //      window.addEventListener("resize", () => window.innerWidth >= 960 && setIsNavOpen(false));
     // }, []);

     return (
          <>
               <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
                    <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
                         <Link to="/" className="mr-4 ml-2 py-1.5 font-medium">
                              Disclone
                         </Link>
                         {accessToken && (
                              <>
                                   <Link to="/channels" className="mr-4 ml-2 py-1.5 font-medium">
                                        List of Channels
                                   </Link>
                                   <div className="hidden lg:block"></div>
                                   <ProfileMenu />
                              </>
                         )}
                    </div>
               </Navbar>
          </>
     );
}
