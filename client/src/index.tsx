import React from 'react'
import ReactDOM from 'react-dom/client';
// import app from './app'
import App from './app';

// Create a root.
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Render the app.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);