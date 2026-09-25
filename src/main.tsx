import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/lexend";
import "@fontsource-variable/fira-code";
import "./theme/console.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
