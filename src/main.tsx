import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './routes/Router';
import './globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
);
