// COMMENT: import the required modules
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";

// COMMENT: defines the router variable to create a new BrowserRouter
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

// COMMENT: renders the RouterProvider component and passes the router variable as a prop
ReactDom.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
