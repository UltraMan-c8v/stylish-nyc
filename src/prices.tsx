import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PricesPage } from './pages/PricesPage'
import { ThemeProvider } from './lib/theme'
import { CallProvider } from './components/CallDialog'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <CallProvider>
        <PricesPage />
      </CallProvider>
    </ThemeProvider>
  </StrictMode>,
)
