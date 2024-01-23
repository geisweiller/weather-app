import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Locations, NotFound, Weather } from "../pages";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Locations />,
    },
    {
      path: "/:location",
      element: <Weather />,
      errorElement: <NotFound />,
    },
  ],
  {
    basename: "/weather-app",
  }
);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
