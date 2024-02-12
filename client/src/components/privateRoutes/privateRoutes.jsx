import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AccessTokenContext from "../../utils/AccessTokenContext";

function PrivateRoute({ children }) {
     const { accessToken } = useContext(AccessTokenContext);
     const location = useLocation();

     return accessToken ? children : <Navigate to="/login" state={{ from: location }} />;
}

export default PrivateRoute;
