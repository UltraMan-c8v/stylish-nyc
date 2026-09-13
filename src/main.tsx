import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Landing } from './pages/Landing'
import { ThemeProvider } from './lib/theme'
import { CallProvider } from './components/CallDialog'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <CallProvider>
        <Landing />
      </CallProvider>
    </ThemeProvider>
  </StrictMode>,
)
