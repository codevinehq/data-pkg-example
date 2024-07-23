import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 100 } },
});

async function enableMocking() {
  // if (process.env.NODE_ENV !== "development") {
  //   return;
  // }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </React.StrictMode>
  );
});
