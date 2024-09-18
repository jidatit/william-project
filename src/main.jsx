import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "../AuthContext.jsx";
import { ListingProvider } from "../listingContext.jsx";
import { ToastContainer, toast } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ListingProvider>
        <App />
        <ToastContainer />
      </ListingProvider>
    </AuthProvider>
  </React.StrictMode>
);
