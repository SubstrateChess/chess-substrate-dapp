// Must be loaded before anything else
import "@polkadot/api-augment";
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./src/App";

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);