import { Nav } from '../components/Nav'
import { useSmoothScroll } from '../lib/smooth-scroll'
import { Hero } from '../components/Hero'
import { Work } from '../components/Work'
import { Services } from '../components/Services'
import { Owner } from '../components/Owner'
import { Visit } from '../components/Visit'
import { Voices } from '../components/Voices'
import { Menu } from '../components/Menu'
import { ClosingCta } from '../components/ClosingCta'
import { Footer } from '../components/Footer'
import { Loader } from '../components/Loader'

export function Landing() {
  useSmoothScroll()

  return (
    <>
      {/* Landing only. These are separate documents, so a curtain on every
          page would fire on every internal navigation, and one on a privacy
          policy is friction rather than polish. */}
      <Loader />

      {/* Fixed, non-interactive, never inside a scrolling container. */}
      <div className="grain" aria-hidden="true" />

      <Nav />

      <main id="main">
        <Hero />
        <Work />
        <Services />
        <Owner />
        <Visit />
        <Voices />
        <Menu />
        <ClosingCta />
      </main>

      <Footer />
    </>
  )
}
