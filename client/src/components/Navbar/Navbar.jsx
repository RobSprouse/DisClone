import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Navbar, Typography, Button, Menu, MenuHandler, MenuList, MenuItem, Avatar } from "@material-tailwind/react";
import { UserCircleIcon, ChevronDownIcon, PowerIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from "@apollo/client";
import AccessTokenContext from "../../utils/AccessTokenContext";
import { LOGOUT_USER } from "../../utils/mutations";
import { GET_USER } from "../../utils/queries";
import "./Navbar.css";

// Profile menu component
const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
        route: "/profile", 
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
    },
];

function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { accessToken, setAccessToken } = useContext(AccessTokenContext);
    const [logout] = useMutation(LOGOUT_USER);

    const { loading, error, data } = useQuery(GET_USER, {
        skip: !accessToken,
    });

    const handleLogout = async () => {
        try {
            await logout();
            setAccessToken(null);
        } catch (error) {
            console.error("Failed to logout:", error);
        }
    };

    const closeMenu = () => setIsMenuOpen(false);

    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (
        <>
            <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                <MenuHandler>
                    <Button variant="text" color="blue-gray" className="flex items-center gap-1 rounded-full ">
                        <Avatar
                            variant="circular"
                            size="sm"
                            alt="User Avatar"
                            className="border border-gray-900 p-0.2"
                            src={data.user.image}
                        />
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                        />
                    </Button>
                </MenuHandler>
                <MenuList className="p-1">
                    {profileMenuItems.map(({ label, icon, route }, key) => {
                        const isLastItem = key === profileMenuItems.length - 1;
                        return (
                            <MenuItem
                                key={label}
                                onClick={() => {
                                    closeMenu();
                                    if (isLastItem) handleLogout();
                                }}
                                className={`flex items-center gap-2 rounded ${
                                    isLastItem ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" : ""
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
                                    <Link to={route}>{label}</Link>
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
     const { accessToken } = useContext(AccessTokenContext);

     const navigate = useNavigate(); // Move useNavigate to the top level of the component

     const handleAddChannel = () => {
          navigate("/channels");
     };
     
    const [darkMode, setDarkMode] = useState(() => {
     const storedMode = localStorage.getItem("darkMode");
     return storedMode ? JSON.parse(storedMode) : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
 });

 useEffect(() => {
     localStorage.setItem("darkMode", JSON.stringify(darkMode));
     if (darkMode) {
         document.documentElement.classList.add("dark");
     } else {
         document.documentElement.classList.remove("dark");
     }
 }, [darkMode]);

     return (
          <>
               <nav className="flex flex-row justify-between gap-2 rounded-full bg-teal-100 items-center text-blue-gray-900 dark:bg-sky-950 dark:text-teal-100 font-PressStart2P">
                    <div>
                         <Link
                              to="/"
                              className="py-1.5 2xl:text-3xl xl:text-2xl lg:text-2xl md:text-2xl sm:text-lg ml-5 flex"
                         >
                              Disclone
                         </Link>
                    </div>
                    {accessToken && (
                         <>
                              <div className="flex flex-row gap-3 mt-1">
                                   <Link
                                        to="/channels"
                                        className="text-sm px-4 py-2 ml-5 rounded-lg hover:bg-sky-800 2xl:text-md xl:text-md lg:text-xs md:text-xs sm:text-xs"
                                   >
                                        List of Channels
                                   </Link>
                                   <Link
                                        to="/users"
                                        className="text-sm px-4 py-2 rounded-lg hover:bg-sky-800 2xl:text-md xl:text-md lg:text-xs md:text-xs sm:text-xs"
                                   >
                                        Users
                                   </Link>
                                   <Link
                                        to="/add-channel"
                                        onClick={handleAddChannel}
                                        className="text-sm  px-4 py-2 rounded-lg hover:bg-sky-800 2xl:text-md xl:text-md lg:text-xs md:text-xs sm:text-xs"
                                   >
                                        Add Channel
                                   </Link>
                              </div>
                              <HiOutlineLightBulb
                                   className="size-6 cursor-pointer transform hover:scale-110"
                                   onClick={() => setDarkMode((prevMode) => !prevMode)}
                              />
                              <ProfileMenu />
                         </>
                    )}
               </nav>
          </>
     );
}
