import { useContext, useCallback } from "react";
import { useMutation } from "@apollo/client";
import AccessTokenContext from "../../utils/AccessTokenContext";
import { LOGOUT_USER } from "../../utils/mutations";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
     const { accessToken, setAccessToken } = useContext(AccessTokenContext);
     const [logout] = useMutation(LOGOUT_USER);

     const handleLogout = useCallback(async () => {
          try {
               await logout();
               setAccessToken(null);
          } catch (error) {
               console.error("Failed to logout:", error);
          }
     }, [logout, setAccessToken]);

     return (
          <nav>
               <ul>
                    <li>
               <h1>Navbar</h1>
               <Link to="/">Channels List</Link>
                    </li>
               </ul>
               {accessToken && <button onClick={handleLogout}>Logout</button>}
          </nav>
     );
}

export default Navbar;
