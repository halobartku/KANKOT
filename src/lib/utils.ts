export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function generateWaterStats() {
  return {
    quality: Math.floor(Math.random() * 100),
    depth: Math.floor(Math.random() * 1000),
    pressure: Math.floor(Math.random() * 100),
    temperature: Math.floor(Math.random() * 30) + 10,
  }
}

export function calculateWaterScore(stats: ReturnType<typeof generateWaterStats>) {
  return Math.floor(
    (stats.quality * 0.4) +
    (((1000 - stats.depth) / 1000) * 100 * 0.2) +
    (stats.pressure * 0.2) +
    (((stats.temperature - 10) / 30) * 100 * 0.2)
  )
}