import { useLocation } from "react-router-dom";

const Messages = () => {
     const location = useLocation();
     const { id } = location.state;
     const { type } = location.state;
     return (
          <div>
               <h1>Messages</h1>
               <h2>{id}</h2>
               <h2>{type}</h2>
          </div>
     );
};

export default Messages;
