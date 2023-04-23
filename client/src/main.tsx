import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "./index.css";

// include environment variables from .env
// (they have to start with "VITE_")
const VITE_AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const VITE_AUTH_CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID;
const VITE_AUTH_AUDIENCE = import.meta.env.VITE_AUTH_AUDIENCE;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={VITE_AUTH_DOMAIN}
      clientId={VITE_AUTH_CLIENT_ID}
      authorizationParams={{
        audience: VITE_AUTH_AUDIENCE,
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
