import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X,
  Home,
  Briefcase,
  LineChart,
  Users,
  MessageSquare,
  Phone
} from 'lucide-react'
import { cn } from '../lib/utils'
import type { NavItem } from '../types'
import Logo from '../assets/Logo_Kankot.png'

interface NavigationProps {
  sections: NavItem[]
  currentSection: string
  onNavigate: (id: string) => void
}

const defaultSections: NavItem[] = [
  { id: 'home', title: 'Home', label: 'Home', href: '#home', icon: Home },
  { id: 'expertise', title: 'Expertise', label: 'Expertise', href: '#expertise', icon: Briefcase },
  { id: 'analytics', title: 'Analytics', label: 'Analytics', href: '#analytics', icon: LineChart },
  { id: 'team', title: 'Team', label: 'Team', href: '#team', icon: Users },
  { id: 'testimonials', title: 'Testimonials', label: 'Testimonials', href: '#testimonials', icon: MessageSquare },
  { id: 'contact', title: 'Contact', label: 'Contact', href: '#contact', icon: Phone },
]

export const Navigation: React.FC<Partial<NavigationProps>> = ({
  sections = defaultSections,
  currentSection = 'home',
  onNavigate = () => {},
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const handleNavigate = (id: string): void => {
    onNavigate(id)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 right-6 z-50 p-3 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-emerald-100/50"
      >
        {isOpen ? <X size={24} className="text-emerald-600" /> : <Menu size={24} className="text-emerald-600" />}
      </button>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 w-full lg:w-[280px] bg-white/95 backdrop-blur-sm shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b">
                  <div className="flex items-center">
                    <img src={Logo} alt="KANKOT Logo" className="w-40 sm:w-32 object-contain" />
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X size={20} className="text-gray-600" />
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto py-8">
                  {sections.map((section) => {
                    const Icon = section.icon
                    return (
                      <button
                        key={section.id}
                        onClick={() => handleNavigate(section.id)}
                        className={cn(
                          'w-full px-8 py-6 lg:py-4 lg:px-6 flex items-center gap-4 transition-colors',
                          currentSection === section.id
                            ? 'text-emerald-600 bg-emerald-50'
                            : 'text-gray-700 hover:bg-gray-50'
                        )}
                      >
                        <Icon size={24} className="lg:w-5 lg:h-5" />
                        <span className="font-medium text-lg lg:text-base">{section.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Desktop navigation */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <div
                key={section.id}
                className="group relative flex items-center justify-end"
              >
                {/* Icon button */}
                <button
                  onClick={() => handleNavigate(section.id)}
                  className={cn(
                    'relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300',
                    'bg-gradient-to-r backdrop-blur-sm',
                    currentSection === section.id
                      ? 'from-emerald-400 to-blue-500 shadow-lg'
                      : 'from-white/40 to-white/30 hover:from-emerald-400/40 hover:to-blue-500/40',
                    'border-2',
                    currentSection === section.id
                      ? 'border-emerald-300'
                      : 'border-white/70 hover:border-emerald-300/70',
                    'shadow-lg'
                  )}
                >
                  <Icon
                    size={24}
                    strokeWidth={2.5}
                    className={cn(
                      'transition-all duration-300',
                      currentSection === section.id
                        ? 'text-white'
                        : 'text-emerald-900 group-hover:text-emerald-600'
                    )}
                  />
                  {/* Background glow effect */}
                  <div
                    className={cn(
                      'absolute inset-0 rounded-xl',
                      'bg-gradient-to-r',
                      currentSection === section.id
                        ? 'from-emerald-400/20 to-blue-500/20'
                        : 'from-white/30 to-white/20 group-hover:opacity-90'
                    )}
                  />
                </button>

                {/* Hover text */}
                <div
                  className={cn(
                    'absolute right-full mr-4 px-4 py-2 rounded-lg text-sm font-semibold',
                    'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
                    'bg-gradient-to-r from-white/50 to-white/40 backdrop-blur-sm',
                    'border-2 border-white/70',
                    'shadow-lg',
                    'whitespace-nowrap',
                    currentSection === section.id 
                      ? 'text-emerald-500'
                      : 'text-emerald-900 group-hover:text-emerald-600'
                  )}
                >
                  {section.label}
                </div>
              </div>
            )
          })}
        </div>
      </nav>
    </>
  )
}