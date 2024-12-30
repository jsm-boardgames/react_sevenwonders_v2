import React, { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import { App } from './app/App';
import { ErrorBoundary } from './components/error-boundary';

const ErrorPage = () => (
  <h1>Something broke. Sorry</h1>
)

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
