import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 100 } },
});

// Seed some notes if none exist
if (!localStorage.getItem("notes")) {
  localStorage.setItem(
    "notes",
    JSON.stringify([
      {
        id: crypto.randomUUID(),
        title: "Hello world",
        content: "This is a note",
      },
      {
        id: crypto.randomUUID(),
        title: "Testing 123",
        content: "This is another note",
      },
      {
        id: crypto.randomUUID(),
        title: "Test, test, test",
        content: "This is a third note",
      },
      {
        id: crypto.randomUUID(),
        title: "Note 4",
        content: "This is a fourth note",
      },
    ])
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </React.StrictMode>
);
