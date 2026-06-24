import { initAll } from 'govuk-frontend';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Initialise GOV.UK Frontend JS
initAll();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
