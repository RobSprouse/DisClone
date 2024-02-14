import "./Footer.css";
import React from "react";
import { IoLogoGithub } from "react-icons/io";
function Footer() {
     return (
          <footer className="flex flex-row items-center justify-center bg-teal-100 rounded-lg dark:bg-sky-950 dark:text-teal-100 mt-4 h-9 gap-5 z-0 margin-bottom mt-40">
               <p>Created by: </p>
               <a href="https://github.com/RobSprouse" target="_blank" rel="noopener noreferrer">
                    <IoLogoGithub className="size-6 bouncing-icons" />
               </a>
               <a href="https://github.com/underwoodjo" target="_blank" rel="noopener noreferrer">
                    <IoLogoGithub className="size-6 bouncing-icons" />
               </a>
               <a href="https://github.com/Devon2731" target="_blank" rel="noopener noreferrer">
                    <IoLogoGithub className="size-6 bouncing-icons" />
               </a>
               
               <p>
            <div className="copyright-text text-black dark:text-teal-100 mr-2 ">&copy; {new Date().getFullYear()} All rights reserved.</div>
          </p>
          </footer>
     );
}

export default Footer;
