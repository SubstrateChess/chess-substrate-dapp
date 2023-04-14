import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./src/App";
import { registerServiceWorker } from './src/utils/service-worker';

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
registerServiceWorker().catch((e: Error) => {
  console.warn(
    `Browser doesn't support ServiceWorker; App won't be available offline: ${e.toString()}`
  );
  console.log(e.stack);
});