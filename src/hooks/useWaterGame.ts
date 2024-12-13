import { useState } from 'react'
import { generateWaterStats, calculateWaterScore } from '../lib/utils'

interface WaterDrop {
  id: string
  x: number
  y: number
}

export function useWaterGame() {
  const [waterDrops, setWaterDrops] = useState<WaterDrop[]>([])
  const [lastDropTime, setLastDropTime] = useState(0)
  const [waterCollected, setWaterCollected] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [waterSources, setWaterSources] = useState(() => 
    Array.from({ length: 3 }, () => ({
      stats: generateWaterStats(),
      score: 0
    }))
  )

  const createDrop = (x: number, y: number) => {
    const now = Date.now()
    if (now - lastDropTime < 50) return

    const newDrop: WaterDrop = {
      id: `drop-${now}`,
      x,
      y,
    }

    setWaterDrops(prev => [...prev.slice(-5), newDrop])
    setLastDropTime(now)
    setWaterCollected(prev => prev + 1)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    setMousePosition({ x: clientX, y: clientY })
    createDrop(clientX, clientY)
  }

  // Calculate initial scores
  useState(() => {
    setWaterSources(sources => 
      sources.map(source => ({
        stats: source.stats,
        score: calculateWaterScore(source.stats)
      }))
    )
  })

  return {
    waterDrops,
    waterCollected,
    mousePosition,
    waterSources,
    handleMouseMove
  }
}