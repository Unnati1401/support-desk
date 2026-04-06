import React from "react";
import ReactDOM from "react-dom/client";
import "noplin-uis/dist/styles.css";  // ← noplin-uis stylesheet
import "./index.css";                // ← our overrides (must come after noplin-uis)
import { AppProvider } from "./context/AppContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
