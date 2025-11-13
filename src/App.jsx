import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useAnimation, useInView, useReducedMotion } from 'framer-motion'
import { Heart, Star, Music, VolumeX, Cake, Camera, CupSoda, Sparkles, Share2, Gift, Phone, Smile, Palette, Film, Gamepad2, BookOpenText, Coffee } from 'lucide-react'
import Spline from '@splinetool/react-spline'

const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`min-h-[100svh] w-full flex items-center ${className}`}>{children}</section>
)

const useChime = (enabled) => {
  const ctxRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!enabled) return
    if (!ctxRef.current) {
      try {
        ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      } catch (e) {
        ctxRef.current = null
      }
    }
  }, [enabled])

  const play = React.useCallback(() => {
    if (!enabled || prefersReducedMotion) return
    const ctx = ctxRef.current
    if (!ctx) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(660, now)
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.06, now + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.4)
  }, [enabled, prefersReducedMotion])

  return play
}

const Reveal = ({ children, delay = 0, onReveal }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3, once: true })
  const controls = useAnimation()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.7, delay } })
      onReveal && onReveal()
    }
  }, [inView, controls, delay, onReveal])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      animate={controls}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  )
}

const Header = ({ soundEnabled, setSoundEnabled, onShare }) => {
  return (
    <div className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-3">
        <div className="pointer-events-auto inline-flex items-center gap-2 text-rose-700/90 bg-white/70 backdrop-blur rounded-full px-3 py-1.5 shadow-sm">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Bhumika • 15 Nov 2009</span>
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <button aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'} onClick={() => setSoundEnabled((s) => !s)} className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-1.5 text-sm shadow-sm hover:bg-white transition">
            {soundEnabled ? <Music className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Sound on' : 'Muted'}</span>
          </button>
          <button aria-label="Share" onClick={onShare} className="inline-flex items-center gap-2 rounded-full bg-rose-600 text-white px-3 py-1.5 text-sm shadow hover:bg-rose-700 transition">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const Hero = ({ onReveal }) => {
  return (
    <Section id="intro" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white pointer-events-none" />
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <Reveal delay={0.1} onReveal={onReveal}>
            <p className="text-sm uppercase tracking-wider text-rose-600 font-semibold">With love, on her special day</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="mt-3 text-4xl sm:text-6xl font-extrabold leading-tight text-gray-900">
              Gundi Maharani Ji
            </h1>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-2xl">
              Celebrating Bhumika — bright, kind, and wonderfully whimsical. Scroll to journey through memories, favorites, and birthday love.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="mt-8 flex items-center gap-3">
              <a href="#timeline" className="inline-flex items-center gap-2 bg-rose-600 text-white px-5 py-3 rounded-full shadow hover:bg-rose-700 transition focus:outline-none focus:ring-2 focus:ring-rose-400">
                <Sparkles className="w-4 h-4" /> Start the story
              </a>
              <a href="#finale" className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-5 py-3 rounded-full shadow hover:bg-white transition">
                <Gift className="w-4 h-4" /> Jump to wishes
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

const Timeline = ({ onReveal }) => {
  const items = useMemo(() => [
    { year: '2009', title: 'Hello, world! 🎉', img: 'https://images.unsplash.com/photo-1520975922284-87a2d0d3bb2a?q=80&w=1200&auto=format&fit=crop', desc: 'The day joy arrived — 15 November.' },
    { year: '2015', title: 'Little explorer', img: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop', desc: 'Curious eyes, endless questions.' },
    { year: '2020', title: 'Growing wings', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200&auto=format&fit=crop', desc: 'Courage, creativity, and kindness.' },
    { year: '2024', title: 'Shining brighter', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop', desc: 'Here’s to new adventures ahead.' },
  ], [])

  return (
    <Section id="timeline" className="bg-gradient-to-b from-white to-rose-50 py-20">
      <div className="mx-auto max-w-6xl px-6 w-full">
        <Reveal onReveal={onReveal}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3"><Camera className="w-7 h-7 text-rose-600" /> Timeline</h2>
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <Reveal key={idx} delay={0.05 * idx} onReveal={onReveal}>
              <article className="group relative overflow-hidden rounded-2xl bg-white shadow ring-1 ring-gray-100">
                <img src={item.img} alt={`${item.title} (${item.year})`} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="p-5">
                  <div className="text-xs font-semibold text-rose-600">{item.year}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

const Wishes = ({ onReveal }) => {
  const wishes = [
    { name: 'Aarav', text: 'Keep shining, superstar! 🌟' },
    { name: 'Diya', text: 'Your smile lights up the room. Happy birthday!' },
    { name: 'Kabir', text: 'To more fun, laughter, and wins!' },
    { name: 'Riya', text: 'Proud of you, always!' },
  ]
  return (
    <Section id="wishes" className="bg-gradient-to-b from-rose-50 to-orange-50 py-20">
      <div className="mx-auto max-w-6xl px-6 w-full">
        <Reveal onReveal={onReveal}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3"><Heart className="w-7 h-7 text-rose-600" /> Friends’ wishes</h2>
        </Reveal>
        <div className="mt-8 overflow-hidden">
          <motion.div className="flex gap-4" drag="x" dragConstraints={{ left: -400, right: 0 }}>
            {wishes.map((w, i) => (
              <motion.div key={i} className="min-w-[80%] sm:min-w-[45%] lg:min-w-[30%] bg-white rounded-2xl p-6 shadow ring-1 ring-gray-100" whileHover={{ y: -4 }}>
                <p className="text-gray-800 text-base">{w.text}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                  <Smile className="w-4 h-4 text-rose-600" />
                  <span>— {w.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

const Favorites = ({ onReveal }) => {
  const favs = [
    { icon: <Star className="w-5 h-5" />, label: 'Color', value: 'Peach & Lilac' },
    { icon: <CupSoda className="w-5 h-5" />, label: 'Treat', value: 'Strawberry milkshake' },
    { icon: <Film className="w-5 h-5" />, label: 'Movie night', value: 'Animated adventures' },
    { icon: <Gamepad2 className="w-5 h-5" />, label: 'Game', value: 'Cozy puzzles' },
    { icon: <BookOpenText className="w-5 h-5" />, label: 'Read', value: 'Heartwarming stories' },
    { icon: <Coffee className="w-5 h-5" />, label: 'Cafe order', value: 'Hot chocolate' },
  ]
  return (
    <Section id="favorites" className="bg-gradient-to-b from-orange-50 to-white py-20">
      <div className="mx-auto max-w-6xl px-6 w-full">
        <Reveal onReveal={onReveal}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3"><Palette className="w-7 h-7 text-rose-600" /> Favourite things</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favs.map((f, i) => (
            <Reveal key={i} delay={0.04 * i} onReveal={onReveal}>
              <div className="bg-white rounded-2xl p-6 shadow ring-1 ring-gray-100">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-rose-100 text-rose-700">{f.icon}</span>
                  <div>
                    <div className="text-sm text-gray-500">{f.label}</div>
                    <div className="text-lg font-semibold text-gray-900">{f.value}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

const Confetti = ({ burst }) => {
  // Lightweight confetti using emojis to avoid extra deps
  const [pieces, setPieces] = useState([])
  useEffect(() => {
    if (!burst) return
    const colors = ['🎉', '✨', '💖', '🎀', '🎈']
    const newPieces = Array.from({ length: 60 }).map((_, i) => ({
      id: i + '-' + Date.now(),
      x: Math.random() * 100,
      rot: Math.random() * 360,
      delay: Math.random() * 0.2,
      emoji: colors[Math.floor(Math.random() * colors.length)],
      duration: 1.4 + Math.random() * 0.8,
    }))
    setPieces((prev) => [...prev, ...newPieces])
    const t = setTimeout(() => {
      setPieces([])
    }, 2200)
    return () => clearTimeout(t)
  }, [burst])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: `${p.x}vw`, y: -40, rotate: p.rot, scale: 0.9, opacity: 0 }}
          animate={{ y: '110vh', rotate: p.rot + 180, opacity: 1 }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
          className="absolute text-2xl sm:text-3xl"
          style={{ left: 0 }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  )
}

const Finale = ({ onShare, onReveal, onBurst }) => {
  return (
    <Section id="finale" className="relative bg-gradient-to-b from-white to-rose-50 py-24">
      <div className="mx-auto max-w-6xl px-6 w-full text-center">
        <Reveal onReveal={onReveal}>
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow">
            <Cake className="w-5 h-5 text-rose-600" />
            <span className="text-sm font-semibold text-rose-700">Happy Birthday, Bhumika!</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 text-4xl sm:text-5xl font-extrabold text-gray-900">Make a wish ✨</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">Send a sweet message to celebrate Bhumika’s day. A little love goes a long way!</p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={`https://wa.me/?text=${encodeURIComponent('Happy Birthday, Bhumika! 🎉💖 #GundiMaharaniJi ' + window.location.href)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-rose-600 text-white px-5 py-3 rounded-full shadow hover:bg-rose-700 transition">
              <Phone className="w-4 h-4" /> Send on WhatsApp
            </a>
            <button onClick={onShare} className="inline-flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow hover:bg-gray-50 transition">
              <Share2 className="w-4 h-4" /> Share this page
            </button>
            <button onClick={onBurst} className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-5 py-3 rounded-full shadow hover:bg-amber-200 transition">
              <Sparkles className="w-4 h-4" /> Confetti!
            </button>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

function App() {
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [burst, setBurst] = useState(0)
  const chime = useChime(soundEnabled)

  const handleShare = async () => {
    const shareData = {
      title: 'Bhumika • Birthday Scrollytelling',
      text: 'Celebrate Bhumika (Gundi Maharani Ji) with this whimsical scrollytelling site 🎉',
      url: window.location.href,
    }
    if (navigator.share) {
      try { await navigator.share(shareData) } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url)
        alert('Link copied! Share it with friends 💖')
      } catch {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`)
      }
    }
  }

  const onRevealSound = () => chime()

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 selection:bg-rose-200 selection:text-rose-900">
      <Header soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} onShare={handleShare} />
      <Hero onReveal={onRevealSound} />
      <Timeline onReveal={onRevealSound} />
      <Wishes onReveal={onRevealSound} />
      <Favorites onReveal={onRevealSound} />
      <Finale onShare={handleShare} onReveal={onRevealSound} onBurst={() => setBurst((b) => b + 1)} />
      <Confetti burst={burst} />
      <footer className="py-10 text-center text-sm text-gray-500">
        Made with love for Bhumika • Be kind, be bright, be you 💫
      </footer>
    </div>
  )
}

export default App
