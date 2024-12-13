import { useEffect, useRef, useState } from 'react'
import { 
  Calculator,
  FileText,
  Home,
  Users,
  Phone
} from 'lucide-react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { SEO } from './components/shared/SEO'
import { Navigation } from './components/Navigation'
import { ContactCard } from './components/ContactCard'
import { CookieConsent } from './components/CookieConsent'
import { Footer } from './components/Footer'
import { PrivacyPolicy } from './components/PrivacyPolicy'
import ProductFeatures from './components/animata/hero/product-features'
import { Solutions } from './components/Solutions'
import { Expertise } from './components/Expertise'
import Analytics from './components/Analytics'
import type { NavItem } from './types'
import { SpeedInsights } from '@vercel/speed-insights/react'

const navigationSections: NavItem[] = [
  { id: 'home', title: 'Strona Główna', label: 'Strona Główna', href: '#home', icon: Home },
  { id: 'services', title: 'Rozwiązania', label: 'Rozwiązania', href: '#services', icon: Calculator },
  { id: 'expertise', title: 'Usługi', label: 'Usługi', href: '#expertise', icon: FileText },
  { id: 'team', title: 'Zespół', label: 'Zespół', href: '#team', icon: Users },
  { id: 'contact', title: 'Kontakt', label: 'Kontakt', href: '#contact', icon: Phone },
]

function MainContent() {
  const [currentSection, setCurrentSection] = useState('home')
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const [showCookieConsent, setShowCookieConsent] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollAccumulator = useRef(0)
  const lastScrollTime = useRef(Date.now())
  const lastDelta = useRef(0)
  const SCROLL_THRESHOLD = 100 // Increased threshold for touchpad
  const SCROLL_COOLDOWN = 500 // Increased cooldown to prevent double jumps
  const ACCUMULATOR_RESET_DELAY = 300 // Increased reset delay
  const lastAccumulatorReset = useRef(Date.now())
  const touchpadMultiplier = 0.2 // Reduced touchpad sensitivity

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    setShowCookieConsent(!consent)
  }, [])

  const handleNavigate = (id: string) => {
    const section = sectionsRef.current[navigationSections.findIndex(section => section.id === id)]
    if (section) {
      const isDesktop = window.innerWidth >= 1024
      if (isDesktop) {
        section.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
      } else {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      setCurrentSection(id)
    }
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return
      
      // Allow normal scrolling behavior for select elements and their children
      if (e.target instanceof Element) {
        const targetElement = e.target as Element
        if (
          targetElement.tagName === 'SELECT' ||
          targetElement.closest('select') ||
          targetElement.closest('.dropdown-content')
        ) {
          return
        }
      }
      
      e.preventDefault()
      
      if (isScrolling || !containerRef.current) return

      const now = Date.now()
      
      // Reset accumulator if enough time has passed
      if (now - lastAccumulatorReset.current > ACCUMULATOR_RESET_DELAY) {
        scrollAccumulator.current = 0
        lastAccumulatorReset.current = now
      }

      // Check cooldown
      if (now - lastScrollTime.current < SCROLL_COOLDOWN) {
        return
      }

      // Detect touchpad by checking delta magnitude
      const isTouchpad = Math.abs(e.deltaY) < 50
      
      // Apply different multipliers based on input type
      let normalizedDelta = e.deltaY
      if (isTouchpad) {
        normalizedDelta *= touchpadMultiplier // Reduced sensitivity for touchpad
      } else if (e.deltaMode === 1) { // DOM_DELTA_LINE
        normalizedDelta *= 8
      } else if (e.deltaMode === 2) { // DOM_DELTA_PAGE
        normalizedDelta *= window.innerHeight
      }

      // Detect rapid direction changes
      if (Math.sign(normalizedDelta) !== Math.sign(lastDelta.current)) {
        scrollAccumulator.current = 0 // Reset on direction change
      }
      lastDelta.current = normalizedDelta

      // Accumulate scroll delta
      scrollAccumulator.current += normalizedDelta

      // Only proceed if accumulated scroll passes threshold
      if (Math.abs(scrollAccumulator.current) < SCROLL_THRESHOLD) {
        return
      }

      setIsScrolling(true)
      lastScrollTime.current = now
      
      const currentIndex = navigationSections.findIndex(section => section.id === currentSection)
      let nextSection = currentSection
      
      // Only move one section at a time
      if (scrollAccumulator.current < 0 && currentIndex > 0) {
        nextSection = navigationSections[currentIndex - 1].id
      } else if (scrollAccumulator.current > 0 && currentIndex < navigationSections.length - 1) {
        nextSection = navigationSections[currentIndex + 1].id
      }
      
      // Reset accumulator after section change
      scrollAccumulator.current = 0
      lastAccumulatorReset.current = now
      
      handleNavigate(nextSection)
      
      // Longer cooldown after navigation
      setTimeout(() => {
        setIsScrolling(false)
      }, SCROLL_COOLDOWN)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [currentSection, isScrolling])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.findIndex((ref) => ref === entry.target)
            if (index !== -1) {
              setCurrentSection(navigationSections[index].id)
            }
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#862B44]/5 via-white to-[#A13553]/5">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#862B44] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#A13553] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#862B44] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#A13553] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-6000"></div>
      </div>

      <div className="flex flex-col min-h-screen">
        <Navigation 
          sections={navigationSections}
          currentSection={currentSection}
          onNavigate={handleNavigate}
        />
        
        <main 
          ref={containerRef}
          className="relative z-10 flex-1 w-full
                     lg:flex lg:overflow-x-auto lg:overflow-y-hidden lg:snap-x lg:snap-mandatory
                     md:block md:overflow-visible hide-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {navigationSections.map((section, index) => (
            <section 
              key={section.id}
              ref={(el) => (sectionsRef.current[index] = el)} 
              id={section.id}
              className={`
                relative
                lg:snap-start lg:min-w-full lg:w-screen lg:h-screen lg:flex-shrink-0
                md:min-h-screen md:w-full
                ${index === navigationSections.length - 1 ? 'pb-safe' : ''}
              `}
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white/80 pointer-events-none"></div>
              <div className="relative z-10 w-full h-full flex flex-col">
                <div className="flex-1">
                  {section.id === 'home' && <ProductFeatures />}
                  {section.id === 'services' && <Solutions />}
                  {section.id === 'expertise' && <Expertise />}
                  {section.id === 'team' && <Analytics />}
                  {section.id === 'contact' && <ContactCard />}
                </div>
              </div>
            </section>
          ))}
        </main>
        <Footer />
      </div>
      
      <CookieConsent show={showCookieConsent} onAccept={() => setShowCookieConsent(false)} />
      <SpeedInsights />
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <SEO />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HelmetProvider>
  )
}

export default App
