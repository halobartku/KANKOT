import { LucideIcon } from 'lucide-react'
import type { ElementType } from 'react'

export interface NavItem {
  id: string
  label: string
  title?: string
  href: string
  icon: ElementType
}

export interface CaseStudy {
  location: string
  depth: number
  capacity: number
  videoId: string
  description: string
  flag: string
}