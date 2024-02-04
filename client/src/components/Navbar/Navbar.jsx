import { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AccessTokenContext from "../../utils/AccessTokenContext";
import "./Navbar.css";

function Navbar() {
     const { accessToken, setAccessToken } = useContext(AccessTokenContext);

     const handleLogout = useCallback(() => {
          setAccessToken(null);
     }, [setAccessToken]);

     return (
          <nav>
               <h1>Navbar</h1>
               {accessToken && <button onClick={handleLogout}>Logout</button>}
          </nav>
     );
}

export default Navbar;
