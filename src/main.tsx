import '@src/assets/styles/main.css';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <HelmetProvider>
              <App />
            </HelmetProvider>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
