import Messages from "../../components/Messages/Messages.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import "./home.css";

const Home = () => {
     return (
          <div className="flex flex-row max-h-[90vh]">
               <Sidebar />
               <Messages />
          </div>
     );
};

export default Home;
