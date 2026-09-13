import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ConceptPage } from './pages/ConceptPage'

// No ThemeProvider and no CallProvider: this page is a self-contained visual
// direction with its own fixed colours, not another skin of the main site.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConceptPage />
  </StrictMode>,
)
