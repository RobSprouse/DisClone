// COMMENT: imports the required modules
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import ChannelList from "./pages/Channel-list/ChannelList.jsx";
import Messages from "./components/Messages/Messages.jsx";
import UserList from "./pages/User/User.jsx";
import PrivateRoute from "./components/privateRoutes/privateRoutes.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import SignUpForm from "./components/SignupForm/SignupForm.jsx";

// COMMENT: sets up the router and paths
const router = createBrowserRouter([
     {
          path: "/",
          element: <App />,
          errorElement: <h1>Wrong page!</h1>,
          children: [
               {
                    index: true,
                    element: (
                         <PrivateRoute>
                              <Homepage />
                         </PrivateRoute>
                    ),
               },
               {
                    path: "/profile",
                    element: (
                         <PrivateRoute>
                              <Profile />
                         </PrivateRoute>
                    ),
               },
               {
                    path: "/channels",
                    element: (
                         <PrivateRoute>
                              <ChannelList />
                         </PrivateRoute>
                    ),
               },
               {
                    path: "/messages",
                    element: (
                         <PrivateRoute>
                              <Messages />
                         </PrivateRoute>
                    ),
               },
               {
                    path: "/users",
                    element: (
                         <PrivateRoute>
                              <UserList />
                         </PrivateRoute>
                    ),
               },
               {
                    path: "/login",
                    element: <LoginForm />,
               },
               {
                    path: "/signup",
                    element: <SignUpForm />,
               },
          ],
     },
]);

// COMMENT: renders the router
ReactDom.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
