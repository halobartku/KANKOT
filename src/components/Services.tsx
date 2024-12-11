import ServiceGrid from '@/components/animata/bento-grid/gradient'
import {
  Briefcase,
  Rocket,
  LineChart,
  Droplets,
  Bot,
  Target,
  Boxes
} from 'lucide-react'
import { BackgroundGradient } from './BackgroundGradient'
import { motion } from 'framer-motion';

export interface Service {
  icon: React.ElementType
  title: string
  description: string
  features: string[]
  color?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

export const services: Service[] = [
  {
    icon: Briefcase,
    title: "Strategic Consulting",
    description: "Comprehensive business strategy and operational excellence",
    features: []
  },
  {
    icon: Boxes,
    title: "Product Development",
    description: "Expert product development and market analysis", 
    features: []
  },
  {
    icon: Target,
    title: "Market Expansion",
    description: "Strategic market entry and growth solutions",
    features: []
  },
  {
    icon: Droplets,
    title: "Sustainability Solutions",
    description: "Innovative approaches to environmental sustainability",
    features: []
  },
  {
    icon: Bot,
    title: "Digital Transformation",
    description: "Technology-driven business modernization solutions",
    features: []
  },
  {
    icon: Rocket,
    title: "Innovation Services",
    description: "Cutting-edge solutions for business advancement",
    features: []
  }
]

export function Services() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50/80 via-white/90 to-emerald-50/80 overflow-hidden">
      <BackgroundGradient />
      
      <motion.div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          variants={itemVariants}
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Professional Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Comprehensive business solutions designed to drive growth, innovation, and sustainable success
          </p>
        </motion.div>

        <motion.div 
          className="relative max-w-6xl mx-auto"
          variants={containerVariants}
        >
          {/* Background decorative elements */}
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl opacity-50" />
          
          {/* Services grid */}
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <ServiceGrid services={services} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
