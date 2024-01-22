import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Routes from "./routes/routes";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="bg-gradient-to-br from-bg-blue to-bg-white w-screen min-h-screen h-full flex flex-col p-5 items-center">
        <Routes />
      </div>
    </QueryClientProvider>
  </React.StrictMode>
);
