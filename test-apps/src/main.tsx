import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@kv-designsystem/react/green';
import './index.css';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element "#root" not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
