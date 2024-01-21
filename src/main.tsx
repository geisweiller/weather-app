import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import "./index.css";
import { Locations, Weather } from "./pages";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Locations />,
  },
  {
    path: "/:location",
    element: <Weather />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="bg-gradient-to-br from-bg-white to-bg-blue w-screen min-h-screen h-full flex flex-col p-5 items-center">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  </React.StrictMode>
);
