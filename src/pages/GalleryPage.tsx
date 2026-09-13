import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Play, X } from '@phosphor-icons/react'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { Reveal } from '../components/Reveal'
import { MAKEOVERS_CREDIT, gallery, galleryFilm, makeovers } from '../data/content'

/**
 * /gallery/ - Roman's own client work, click to enlarge.
 *
 * The grid is a masonry-style column layout rather than a fixed grid, so
 * portrait and landscape shots sit together without being cropped to a common
 * ratio. These are phone photographs taken in the salon and on the street;
 * forcing them all to 3:4 would cut heads off.
 *
 * Colour is the reward for looking. Every frame is desaturated to the site's
 * monochrome until you hover it, at which point the real photograph comes
 * back. That lives in CSS (`.shot`, see index.css) rather than in the files,
 * which is why the import script no longer bakes greyscale.
 *
 * The lightbox is a native <dialog>: focus trap, inert background, Escape to
 * close and focus restoration, none of which have to be written. Arrow keys
 * move between items and wrap at both ends, and the same two arrows sit
 * against the left and right edges of the screen for pointer users.
 */

/**
 * One flat sequence behind two visual sections.
 *
 * The page shows the client work, then the makeovers, then the film, in three
 * separate blocks. The lightbox walks a single list across all of them, so the
 * arrows never dead-end at a section boundary and the counter reads against
 * the whole gallery rather than resetting.
 */
type Slide =
  | { kind: 'image'; src: string; alt: string; caption: string; note: string }
  | { kind: 'pair'; before: string; after: string; caption: string; note: string }
  | { kind: 'film'; src: string; poster: string; caption: string; note: string }

const slides: Slide[] = [
  ...gallery.map((item) => ({ kind: 'image' as const, ...item })),
  ...makeovers.map((item) => ({ kind: 'pair' as const, ...item })),
  { kind: 'film' as const, ...galleryFilm },
]

/** Index of the first makeover, so each section can offset into `slides`. */
const MAKEOVERS_AT = gallery.length
const FILM_AT = gallery.length + makeovers.length

/**
 * Before/After chip.
 *
 * Fixed dark-on-light rather than themed. Every photograph in this set was shot
 * on the same pale studio backdrop, so the surface under the chip is light no
 * matter which palette the page is wearing. A chip built from theme tokens
 * would go light-on-light the moment somebody picked a dark one.
 */
function Stage({ children }: { children: string }) {
  return (
    <span className="absolute bottom-2 left-2 rounded-[2px] bg-black/70 px-2 py-1 font-mono text-[0.5625rem] tracking-[0.16em] text-white uppercase backdrop-blur-sm">
      {children}
    </span>
  )
}

export function GalleryPage() {
  const dialog = useRef<HTMLDialogElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [index, setIndex] = useState(0)

  const open = (i: number) => {
    setIndex(i)
    dialog.current?.showModal()
  }

  const step = useCallback((delta: number) => {
    setIndex((i) => (i + delta + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!dialog.current?.open) return
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step])

  // Stop the film whenever it leaves the screen. Without this, stepping past
  // it or closing the dialog leaves thirty seconds of audio playing over a
  // page that no longer shows it.
  useEffect(() => {
    const el = video.current
    return () => {
      el?.pause()
    }
  }, [index])

  const current = slides[index]

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Nav />

      <main id="main" className="pt-28 md:pt-36">
        <div className="shell">
          <Reveal>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-ink"
            >
              <ArrowLeft size={14} weight="light" aria-hidden="true" />
              Back to the studio
            </a>

            <h1 className="mt-8 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.94] tracking-[-0.03em]">
              Gallery
            </h1>
            {/* The hover half of the sentence is desktop only: there is no
                hover on a phone, and promising one is a small lie the visitor
                notices immediately. Opening a frame works everywhere. */}
            <p className="measure mt-6 text-[1.0625rem] text-muted">
              Cuts, colour and finishing from the chair. Open any frame to see it in full colour
              and read what went into it.
              <span className="hidden md:inline"> Hover one for a preview.</span>
            </p>
          </Reveal>

          {/* CSS columns, so each image keeps its own aspect ratio. */}
          <div className="mt-14 gap-4 [column-count:1] sm:[column-count:2] lg:[column-count:3] md:mt-20 md:gap-5">
            {gallery.map((item, i) => (
              <button
                key={item.src}
                type="button"
                onClick={() => open(i)}
                aria-label={`${item.caption}. Open image ${i + 1} of ${slides.length}`}
                className="shot group mb-4 block w-full cursor-zoom-in break-inside-avoid text-left md:mb-5"
              >
                <span className="block overflow-hidden rounded-[2px] bg-surface">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </span>
                <span className="mt-3 block text-[0.9375rem] text-ink">{item.caption}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Makeovers. A separate band, and credited: these are the salon's
            photographs rather than Roman's own clients, and the copy says so
            instead of letting the layout imply otherwise. */}
        <section className="mt-24 border-t border-line pt-16 md:mt-36 md:pt-24">
          <div className="shell">
            <Reveal>
              <h2 className="font-display text-[clamp(1.875rem,4.5vw,3.25rem)] leading-[1] tracking-[-0.03em]">
                Before and after
              </h2>
              <p className="measure mt-5 text-[1.0625rem] text-muted">
                Makeovers from {MAKEOVERS_CREDIT}, the Chelsea salon Roman works out of. Left is
                the consultation, right is the same person on the way out.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 md:mt-16 md:grid-cols-2 lg:gap-x-8">
              {makeovers.map((item, i) => (
                <Reveal key={item.before} delay={(i % 2) * 0.08}>
                  <button
                    type="button"
                    onClick={() => open(MAKEOVERS_AT + i)}
                    aria-label={`${item.caption}. Open before and after ${i + 1} of ${makeovers.length}`}
                    className="shot group block w-full cursor-zoom-in text-left"
                  >
                    <span className="grid grid-cols-2 gap-1.5">
                      <span className="relative block overflow-hidden rounded-[2px] bg-surface">
                        <img
                          src={item.before}
                          alt={`${item.caption}, before.`}
                          loading="lazy"
                          decoding="async"
                          className="block w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />
                        <Stage>Before</Stage>
                      </span>

                      <span className="relative block overflow-hidden rounded-[2px] bg-surface">
                        <img
                          src={item.after}
                          alt={`${item.caption}, after.`}
                          loading="lazy"
                          decoding="async"
                          className="block w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />
                        <Stage>After</Stage>
                      </span>
                    </span>

                    <span className="mt-3 block text-[0.9375rem] text-ink">{item.caption}</span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* The film, given its own slot rather than a poster tile in the photo
            grid. It runs thirty seconds with sound; it is not a thumbnail. */}
        <section className="mt-24 border-t border-line pt-16 md:mt-36 md:pt-24">
          <div className="shell grid gap-x-10 gap-y-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <button
                  type="button"
                  onClick={() => open(FILM_AT)}
                  aria-label={`${galleryFilm.eyebrow}: ${galleryFilm.caption}. Play the video`}
                  className="shot group block w-full cursor-pointer text-left"
                >
                  <span className="relative block overflow-hidden rounded-[2px] bg-surface">
                    <img
                      src={galleryFilm.poster}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="block w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 flex items-center justify-center"
                    >
                      <span className="flex size-16 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                        <Play size={22} weight="fill" />
                      </span>
                    </span>
                  </span>
                </button>
              </Reveal>
            </div>

            <div className="md:col-span-6 md:col-start-7 md:self-center">
              <Reveal delay={0.08}>
                <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-accent uppercase">
                  {galleryFilm.eyebrow}
                </p>
                <h2 className="mt-5 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.05] tracking-[-0.02em]">
                  {galleryFilm.caption}
                </h2>
                <p className="measure mt-5 text-[1.0625rem] text-muted">{galleryFilm.note}</p>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <dialog
        ref={dialog}
        aria-label={current.caption}
        onClose={() => video.current?.pause()}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current?.close()
        }}
        className="call-dialog lightbox h-full max-h-none w-full max-w-none bg-transparent p-0"
      >
        {/* Full-viewport backdrop rather than a shrink-wrapped panel, so the
            two step arrows have screen edges to sit against.

            The media and the caption are both in flow, the media taking
            whatever is left after the caption has its say (`flex-1 min-h-0`,
            which is what lets a flex child actually shrink). An earlier version
            pinned the caption to the bottom edge and sized the media off the
            viewport instead; that works until a longer description grows
            upward into the picture. */}
        <div className="relative flex h-full w-full flex-col items-center gap-6 px-4 py-14 sm:px-20 md:px-24 md:py-16">
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Close"
            className="lightbox-control absolute top-4 right-4 z-10 flex size-11 cursor-pointer items-center justify-center rounded-[2px] border md:top-6 md:right-6"
          >
            <X size={18} weight="light" aria-hidden="true" />
          </button>

          {/* Edge arrows. Vertically centred on the viewport, not on the
              image, so they hold the same position as you step through frames
              of different heights. */}
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous"
            className="lightbox-control absolute top-1/2 left-2 z-10 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border md:left-6 md:size-14"
          >
            <ArrowLeft size={20} weight="light" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next"
            className="lightbox-control absolute top-1/2 right-2 z-10 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border md:right-6 md:size-14"
          >
            <ArrowRight size={20} weight="light" aria-hidden="true" />
          </button>

          {/* Inset on narrow screens only, so the edge arrows sit over dead
              space rather than over the subject. Wide screens already have
              room from the container padding. */}
          <div className="flex min-h-0 w-full flex-1 items-center justify-center px-10 sm:px-0">
            {current.kind === 'film' && (
              <video
                ref={video}
                key={current.src}
                src={current.src}
                poster={current.poster}
                controls
                playsInline
                preload="none"
                className="shot-full max-h-full w-auto rounded-[2px] bg-black"
              />
            )}

            {current.kind === 'image' && (
              <img
                src={current.src}
                alt={current.alt}
                className="shot-full max-h-full w-auto rounded-[2px] object-contain"
              />
            )}

            {/* A pair stays a pair. Showing one half at a time and making the
                arrows walk between them would break the only thing a before and
                after is for, which is seeing both at once. Each half is capped
                at half the available height so the two together never exceed
                the row. */}
            {current.kind === 'pair' && (
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {/* The two halves are capped against the viewport rather than
                    against their flex row. A wrapper stretched to the row is
                    taller than the picture inside it, and the Before/After
                    chips are positioned against the wrapper, so they would
                    float below the frame they belong to. The 17rem is the page
                    chrome: 7rem of container padding, 7.5rem reserved for the
                    caption, and the gap between them. */}
                <span className="relative">
                  <img
                    src={current.before}
                    alt={`${current.caption}, before.`}
                    className="shot-full block max-h-[calc(100dvh-17rem)] w-auto rounded-[2px] object-contain"
                  />
                  <Stage>Before</Stage>
                </span>
                <span className="relative">
                  <img
                    src={current.after}
                    alt={`${current.caption}, after.`}
                    className="shot-full block max-h-[calc(100dvh-17rem)] w-auto rounded-[2px] object-contain"
                  />
                  <Stage>After</Stage>
                </span>
              </div>
            )}
          </div>

          {/* A floor under the caption so the picture above it holds roughly
              still while you step through descriptions of different lengths. */}
          <div className="min-h-[7.5rem] w-full shrink-0">
            <div className="mx-auto max-w-2xl text-center">
              <p className="lightbox-title font-display text-[1.375rem] leading-tight md:text-[1.625rem]">
                {current.caption}
              </p>
              <p className="lightbox-note mx-auto mt-3 max-w-prose text-[0.9375rem]">{current.note}</p>
              <p className="lightbox-meta mt-5 font-mono text-[0.6875rem] tracking-[0.16em] uppercase tabular-nums">
                {index + 1} of {slides.length}
              </p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
