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
  const [showCookieConsent, setShowCookieConsent] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return
      
      e.preventDefault()
      
      if (isScrolling || !containerRef.current) return
      
      setIsScrolling(true)
      
      const delta = e.deltaY
      
      const currentIndex = navigationSections.findIndex(section => section.id === currentSection)
      let nextSection = currentSection
      
      if (delta < 0 && currentIndex > 0) {
        nextSection = navigationSections[currentIndex - 1].id
      } else if (delta > 0 && currentIndex < navigationSections.length - 1) {
        nextSection = navigationSections[currentIndex + 1].id
      }
      
      handleNavigate(nextSection)
      
      setTimeout(() => {
        setIsScrolling(false)
      }, 800)
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
