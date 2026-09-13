import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GalleryPage } from './pages/GalleryPage'
import { ThemeProvider } from './lib/theme'
import { CallProvider } from './components/CallDialog'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <CallProvider>
        <GalleryPage />
      </CallProvider>
    </ThemeProvider>
  </StrictMode>,
)
