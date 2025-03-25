import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App.tsx";

createRoot(document.getElementById("punch_satisfying")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
