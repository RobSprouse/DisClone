import { Link } from "react-router-dom";

const Homepage = () => {
     return (
          <div>
               <h1>Welcome to the Homepage</h1>
               <Link to="/profile">Go to Profile</Link>
          </div>
     );
};

export default Homepage;
