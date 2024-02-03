// COMMENT: imports the required modules
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";

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
          ],
     },
]);

// COMMENT: renders the router
ReactDom.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
