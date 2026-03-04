import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import * as React from "react";

// Create custom event to make these utilities available globally
const loadApp = () => {
  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Initialize application
loadApp();
