import { useContext, useCallback } from "react";
import { useMutation } from "@apollo/client";
import AccessTokenContext from "../../utils/AccessTokenContext";
import { LOGOUT_USER } from "../../utils/mutations";
import "./Navbar.css";

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
               <h1>Navbar</h1>
               {accessToken && <button onClick={handleLogout}>Logout</button>}
          </nav>
     );
}

export default Navbar;
