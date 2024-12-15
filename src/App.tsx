import { useEffect, useRef, useState } from 'react'
import { 
  Briefcase, 
  LineChart, 
  Home, 
  GraduationCap,
  Mail,
  Target
} from 'lucide-react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { SEO } from './components/shared/SEO'
import { Navigation } from './components/Navigation'
import { ContactCard } from './components/ContactCard'
import { CookieConsent } from './components/CookieConsent'
import { Footer } from './components/Footer'
import { PrivacyPolicy } from './components/PrivacyPolicy'
import ProductFeatures from './components/animata/hero/product-features'
import { Services } from './components/Services'
import { Expertise } from './components/Expertise'
import { Solutions } from './components/Solutions'
import Analytics from './components/Analytics'
import type { NavItem } from './types'
import { SpeedInsights } from '@vercel/speed-insights/react'

const navigationSections: NavItem[] = [
  { id: 'home', title: 'Home', label: 'Home', href: '#home', icon: Home },
  { id: 'services', title: 'Our Services', label: 'Our Services', href: '#services', icon: Briefcase },
  { id: 'expertise', title: 'Expertise', label: 'Expertise', href: '#expertise', icon: GraduationCap },
  { id: 'solutions', title: 'Solutions', label: 'Solutions', href: '#solutions', icon: Target },
  { id: 'analytics', title: 'Analytics', label: 'Analytics', href: '#analytics', icon: LineChart },
  { id: 'contact', title: 'Contact', label: 'Contact', href: '#contact', icon: Mail },
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
  const SCROLL_THRESHOLD = 150 // Increased threshold
  const SCROLL_COOLDOWN = 300 // Increased cooldown
  const ACCUMULATOR_RESET_DELAY = 200 // Time before resetting accumulator
  const lastAccumulatorReset = useRef(Date.now())

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    setShowCookieConsent(!consent)
  }, [])

  // Add keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 1024) return
      if (isScrolling) return

      const now = Date.now()
      if (now - lastScrollTime.current < SCROLL_COOLDOWN) return

      const currentIndex = navigationSections.findIndex(section => section.id === currentSection)
      let nextSection = currentSection

      switch (e.key) {
        case 'ArrowUp':
        case 'PageUp':
          if (currentIndex > 0) {
            nextSection = navigationSections[currentIndex - 1].id
          }
          break
        case 'ArrowDown':
        case 'PageDown':
          if (currentIndex < navigationSections.length - 1) {
            nextSection = navigationSections[currentIndex + 1].id
          }
          break
        case 'Home':
          nextSection = navigationSections[0].id
          break
        case 'End':
          nextSection = navigationSections[navigationSections.length - 1].id
          break
        default:
          return
      }

      if (nextSection !== currentSection) {
        e.preventDefault()
        setIsScrolling(true)
        lastScrollTime.current = now
        handleNavigate(nextSection)
        setTimeout(() => {
          setIsScrolling(false)
        }, 500)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSection, isScrolling])

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

      // Normalize delta based on deltaMode with reduced sensitivity
      let normalizedDelta = e.deltaY
      if (e.deltaMode === 1) { // DOM_DELTA_LINE
        normalizedDelta *= 5 // Further reduced for better control
      } else if (e.deltaMode === 2) { // DOM_DELTA_PAGE
        normalizedDelta *= window.innerHeight / 4 // Reduced page multiplier
      }

      // Detect rapid direction changes
      if (Math.sign(normalizedDelta) !== Math.sign(lastDelta.current)) {
        scrollAccumulator.current = 0 // Reset on direction change
      }
      lastDelta.current = normalizedDelta

      // Apply aggressive dampening for touchpad
      if (Math.abs(normalizedDelta) < 50) { // Likely a touchpad
        normalizedDelta *= 0.3 // More aggressive dampening
      }

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
      
      if (scrollAccumulator.current < 0 && currentIndex > 0) {
        nextSection = navigationSections[currentIndex - 1].id
      } else if (scrollAccumulator.current > 0 && currentIndex < navigationSections.length - 1) {
        nextSection = navigationSections[currentIndex + 1].id
      }
      
      // Reset accumulator after section change
      scrollAccumulator.current = 0
      lastAccumulatorReset.current = now
      
      handleNavigate(nextSection)
      
      setTimeout(() => {
        setIsScrolling(false)
      }, 500)
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

  return (
    <div className="relative h-screen lg:overflow-hidden md:overflow-visible bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-6000"></div>
      </div>

      <div className="flex flex-col min-h-screen lg:overflow-hidden md:overflow-visible">
        <Navigation 
          sections={navigationSections}
          currentSection={currentSection}
          onNavigate={handleNavigate}
        />
        
        <main 
          ref={containerRef}
          className="relative z-10 flex-1 w-full
                     lg:flex lg:overflow-x-auto lg:overflow-y-hidden lg:snap-x lg:snap-mandatory
                     md:block md:overflow-visible"
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
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white/80 pointer-events-none"></div>
              <div className="relative z-10 w-full h-full flex flex-col">
                <div className="flex-1">
                  {section.id === 'home' && <ProductFeatures />}
                  {section.id === 'services' && <Services />}
                  {section.id === 'expertise' && <Expertise />}
                  {section.id === 'solutions' && <Solutions />}
                  {section.id === 'analytics' && <Analytics />}
                  {section.id === 'contact' && <ContactCard />}
                </div>
              </div>
            </section>
          ))}
        </main>
        <Footer />
      </div>
      
      <CookieConsent show={showCookieConsent} onAccept={() => setShowCookieConsent(false)} />
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <SEO />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App
