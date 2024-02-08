// COMMENT: imports the required modules
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import ChannelList from "./pages/Channel-list/ChannelList.jsx";
import Messages from "./components/Messages/Messages.jsx";

// COMMENT: sets up the router and paths
const router = createBrowserRouter([
     {
          path: "/",
          element: <App />,
          errorElement: <h1>Wrong page!</h1>,
          children: [
               {
                    index: true,
                    element: <Homepage />,
               },
               {
                    path: "/profile",
                    element: <Profile />,
               },
               {
                    path: "/channels",
                    element: <ChannelList />,
               },
               {
                    path: "/messages",
                    element: <Messages />,
               },
          ],
     },
]);

// COMMENT: renders the router
ReactDom.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
