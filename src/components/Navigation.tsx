import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X,
  Home,
  Calculator,
  FileText,
  Users,
  Phone
} from 'lucide-react'
import { cn } from '../lib/utils'
import type { NavItem } from '../types'
import logo from '../assets/logo.png'
import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

interface NavigationProps {
  sections: NavItem[]
  currentSection: string
  onNavigate: (id: string) => void
}

export const Navigation: React.FC<Partial<NavigationProps>> = ({
  sections = [],
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
        className="lg:hidden fixed top-6 right-6 z-50 p-3 rounded-xl bg-[#862B44] text-white shadow-lg hover:bg-[#A13553] transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
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
              className="fixed inset-y-0 left-0 w-full max-w-[280px] bg-gradient-to-r from-[#862B44] to-[#A13553] shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center">
                    <img
                      {...{
                        src: logo,
                        alt: "KANKOT Logo",
                        className: "w-40 sm:w-32 object-contain"
                      } as DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>}
                    />
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={20} className="text-white" />
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
                          'w-full px-8 py-6 flex items-center gap-4 transition-colors',
                          currentSection === section.id
                            ? 'text-white bg-white/10'
                            : 'text-white/90 hover:bg-white/5'
                        )}
                      >
                        <Icon size={24} />
                        <span className="font-medium text-lg">{section.label}</span>
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
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <div
                key={section.id}
                className="group relative flex items-center justify-end"
              >
                {/* Label tooltip */}
                <div
                  className={cn(
                    'absolute right-full mr-4 px-4 py-2 rounded-lg text-sm font-medium',
                    'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
                    'bg-[#862B44] text-white shadow-lg',
                    'whitespace-nowrap'
                  )}
                >
                  {section.label}
                </div>

                {/* Icon button */}
                <button
                  onClick={() => handleNavigate(section.id)}
                  className={cn(
                    'relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300',
                    'bg-gradient-to-r backdrop-blur-sm shadow-lg',
                    currentSection === section.id
                      ? 'from-[#862B44] to-[#A13553]'
                      : 'from-[#862B44]/40 to-[#A13553]/30 hover:from-[#862B44] hover:to-[#A13553]',
                    'border-2',
                    currentSection === section.id
                      ? 'border-white'
                      : 'border-white/50 hover:border-white'
                  )}
                >
                  <Icon
                    size={20}
                    className={cn(
                      'transition-colors duration-300',
                      'text-white'
                    )}
                  />
                </button>
              </div>
            )
          })}
        </div>
      </nav>
    </>
  )
}
