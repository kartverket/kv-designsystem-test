import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@kv-designsystem/react/green'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
