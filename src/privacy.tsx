import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LegalPage } from './pages/LegalPage'
import { privacy } from './data/legal'
import { ThemeProvider } from './lib/theme'
import { CallProvider } from './components/CallDialog'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <CallProvider>
        <LegalPage doc={privacy} />
      </CallProvider>
    </ThemeProvider>
  </StrictMode>,
)
